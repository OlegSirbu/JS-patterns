/*
 * Copyright 2013 by Avid Technology, Inc.
 */

var Sortable = Sortable || {};
/**
 * This function should be safe to call twice on the same container.
 * Before subscribing to sortstart/sortstop events it removes previous subscriptions.
 */
Sortable.setupSortable = function (sortableContainer, config) {
    var dropZoneCls = config.dropZoneCls || '',
        sortableElementsCls = config.sortableElementsCls || '',
        firstSortableElementCls = config.firstSortableElementCls || '',
        lastSortableElementCls = config.lastSortableElementCls || '',
        cancelSelector = config.cancel || undefined,
        zIndex = config.zIndex || 'auto',
        $lastGoodSrcElement = null,
        handleSelector = config.handle || false;

    sortableContainer.sortable({
        placeholder: dropZoneCls, //add a class to the vacated zones
        axis: 'y', //restrict dragging to the y axis
        opacity: 0.4, //opacity of the source panel during the drag
        tolerance: 'pointer', //reordering occurs after mouse overlaps the droppable
        cancel: cancelSelector,
        zIndex: zIndex,
        containment: sortableContainer,
        // If you set any cursor, it sometimes lead to unexpected increase of container's width
        //cursor:'default',
        delay: 50,
        revert: 200,
        handle: handleSelector
    });

    var _markFirstAndLastSortable = function () {
        var sortableElements = sortableContainer.children('.' + sortableElementsCls); //refresh clips var to get correct order
        sortableElements.removeClass(firstSortableElementCls + ' ' + lastSortableElementCls);
        sortableElements.first().addClass(firstSortableElementCls).end().last().addClass(lastSortableElementCls);
    };


    if (!Ext.isDefined(config) || !Ext.isDefined(config.disableSelection) || config.disableSelection) {
        sortableContainer.disableSelection();
    }

    sortableContainer.children('div[class!="segmentflagForSafariBugfix"]').css('position', 'relative');//segmentflagForSafariBugfix has it's own positioning that shouldn't be changed
    var fn = $.ui.sortable.prototype._rearrange;

    $.ui.sortable.prototype._rearrange = function (event, i, a, hardRefresh) {
        //run our rearrange
        var self = this,
            currentMovingItem = i.item[0],
            ourPlaceholder = this.placeholder[0],
            moveHeight = $(ourPlaceholder).outerHeight() + ($(ourPlaceholder).outerHeight(true) - $(ourPlaceholder).height()) / 2;
        $(currentMovingItem).stop(true).animate({"top": (self.direction === "down" ? "+" : "-") + moveHeight}, 100, function() {
            currentMovingItem.style.top = 0;
            currentMovingItem.parentNode.insertBefore(ourPlaceholder, (self.direction === "down" ? currentMovingItem : currentMovingItem.nextSibling));
        });
    };

    var dragFn = $.ui.sortable.prototype._mouseDrag;

    $.ui.sortable.prototype._mouseDrag = function (event) {

        //(elloyd) ICAJ-1097
        //Because we may have large clips that need to reorder above smaller clips,
        // and the 'reorder' marker is where the mouse is clicked on a clip, we
        // need to allow the clips to scroll above the top of the sequence and below
        // the bottom of the sequence. We don't want the scrolling to be unbounded, because
        // that can cause other problems.

        //So, only when we are dragging, we want to expand the containment area. We need
        // to determine the number of pixels from the click to the top of the clip we are
        // dragging. This number of pixels should be added to the top of the containment.
        // We also need to determine the number of pixels from the click to the bottom of
        // the dragged clip. This number of pixels should be added to the bottom of the
        // containment.
        var $srcElementToUse = null,
            $parentClip = null;

        //First, restore the containment to its original constraints
        if (this.options.containment) {
            this._setContainment();
        }

        //Now, in order to find the distance between the click and the bottom
        // of the clip we are dragging, we need to find the clip that is dragging.
        // Most of the time it will either be the srcElement, or a parent of the
        // srcElement. However, when scrolling off the bottom of the sequence, this
        // may not always be true - so once we find the clip we need to save it
        // in case a later srcElement isn't valid. We should always get at least
        // one valid srcElement, since you have to click on the clip to start a drag

        //Check if we clicked on the clip itself.
        if ($(event.srcElement).hasClass('clip')) {
            //If we did, use it as the srcElement and
            // save it
            $srcElementToUse = $(event.srcElement);
            $lastGoodSrcElement = $srcElementToUse;
        }
        else {
            //check if our parent is a clip (generally if you click on
            // the headframe to drag)
            $parentClip = $(event.srcElement).parent('.clip:first');

            //If we do have a parent clip - use it for the srcElement
            if ($parentClip != null) {
                $srcElementToUse = $parentClip;
                $lastGoodSrcElement = $srcElementToUse;
            }
            //If our srcElement isn't in a clip, then try to use
            // our last known good one.
            else if ($lastGoodSrcElement != null) {
                $srcElementToUse = $lastGoodSrcElement;
            }
            //if all else fails, just use the srcElement we have.
            else {
                $srcElementToUse = $(event.srcElement);
            }
        }

        //Expand the containment by the distance from the top of the clip to the click.
        // Since coordinates go from (0,0) in the top left corner, to expand the containment
        // rectangle we need to subtract the distance. Note that this.offset.click.top
        // should give us the distance from the top of the clip to the click. Also, we
        // add 1 to make sure we don't let the mouse go above the top of the column

        //containment[1] is the Y coordinate for the top of the containment
        this.containment[1] -= (this.offset.click.top + 1);

        //Expand the containment by the distance from the click to the bottom. This should
        // be the height of the srcElement (the clip) minus the distance from the top
        // of the clip to the click (this.offset.click.top). We subtract 1 to ensure that
        // the mouse pointer doesn't go below the bottom of the column

        //containment[3] is the Y coordinate for the bottom of the containment
        this.containment[3] += ($srcElementToUse.height() - this.offset.click.top - 1);

        //Now that we've adjusted our containment, call the original _mouseDrag function
        dragFn.apply(this, arguments);

        //update the containment after applying the drag to fix problems when scrolling
        if (this.options.containment) {
            this._setContainment();
        }

    };

    // Unbind all sortable events in order to avoid duplicated binding. So that it is save to call setuSortable twice.
    sortableContainer.unbind('.sortable-events');

    //after sorting has completed (after the drop), stop any animations in place & remove the top values for all items
    //Q: why doesn't this seem to remove the top value for the fake panel?
    sortableContainer.bind('sortstop.sortable-events', function (event, ui) {
        sortableContainer.children('div').stop().css('top', '');
        //            vidColumn.children('#fakeVideoPanel').remove();

        //mark the first and last clips in the column for styling (and possibly other) purposes
        _markFirstAndLastSortable();
        sortableContainer
            .unbind('.refreshPositions')
            .find('.sortable-container-sizer').remove();

        $(this).closest('.sl-root').find('.sl-left-panel .sl-table-wrapper').unbind('scroll.resizeBg').find('.sl-table').height('100%');

    });

    sortableContainer.bind('sortstart.sortable-events', function (event, ui) {
        $('<div class="sortable-container-sizer">')
            .height(ui.item.outerHeight(true))
            .appendTo(sortableContainer);

        $(ui.placeholder).width($(ui.item).outerWidth()); //set the placeholder - same width as item being dragged
        $(ui.placeholder).height($(ui.item).outerHeight()); //set the placeholder - same height as item being dragged
        $(ui.placeholder).hide().fadeIn(300);

        ui.item.css('left', 'auto');

        sortableContainer.bind('mouseover.refreshPositions sortstop.refreshPositions', function () {
            sortableContainer.sortable('refreshPositions');
            if (sortableContainer.refreshInterval)
                window.clearInterval(sortableContainer.refreshInterval);
        });
        sortableContainer.bind('mouseout.refreshPositions', function () {
            sortableContainer.refreshInterval = window.setInterval(function () {
                sortableContainer.sortable('refreshPositions');
            }, 300);
        });

        $(ui.placeholder).closest('.sl-root').find('.sl-left-panel .sl-table-wrapper').bind('scroll.resizeBg', function () {
            var $table = $(this).find('.sl-table');
            var verticalMargins = $table.outerHeight(1) - $table.height();
            //TODO: ALEX UNCOMMENT IT
            $table.height('100%');// reset scrollHeight to default
            $table.height(this.scrollHeight - verticalMargins);
        });
    });

    sortableContainer.sortable('refresh');
};

Sortable.removeSortable = function(sortableContainer) {
    if (!$.isEmptyObject($.data("ui-sortable"))) {
        sortableContainer.sortable('destroy');
    }
}
