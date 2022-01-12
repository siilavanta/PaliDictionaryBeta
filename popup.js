function makeDragable(dragHandle, dragTarget) {
    let dragObj = null; //object to be moved
    let xOffset = 0; //used to prevent dragged object jumping to mouse location
    let yOffset = 0;

    let dragHandleEl = document.querySelector(dragHandle)
    dragHandleEl.addEventListener("mousedown", startDrag, true);
    dragHandleEl.addEventListener("touchstart", startDrag, true);

    /sets offset parameters and starts listening for mouse-move/
    function startDrag(e) {
        e.preventDefault();
        e.stopPropagation();

        dragObj = document.querySelector(dragTarget);
        dragObj.style.position = "fixed";
        let rect = dragObj.getBoundingClientRect();
        console.log(rect.top)

        if (e.type == "mousedown") {
            xOffset = e.clientX - rect.left; //clientX and getBoundingClientRect() both use viewable area adjusted when scrolling aka 'viewport'
            yOffset = e.clientY - rect.top;
            //console.log(xOffset)

            window.addEventListener('mousemove', dragObject, true);
        } else if (e.type == "touchstart") {
            xOffset = e.targetTouches[0].clientX - rect.left;
            yOffset = e.targetTouches[0].clientY - rect.top;
            dragHandleEl.addEventListener('touchmove', dragObject, true);
        }

    }

    /Drag object/
    function dragObject(e) {
        e.preventDefault();
        e.stopPropagation();

        if (dragObj == null) {

            return; // if there is no object being dragged then do nothing
        } else if (e.type == "mousemove") {
            dragObj.style.left = e.clientX - xOffset + "px"; // adjust location of dragged object so doesn't jump to mouse position
            dragObj.style.top = e.clientY - yOffset + "px";
        } else if (e.type == "touchmove") {
            dragObj.style.left = e.targetTouches[0].clientX - xOffset + "px"; // adjust location of dragged object so doesn't jump to mouse position
            dragObj.style.top = e.targetTouches[0].clientY - yOffset + "px";

        }

    }

    /End dragging/
    document.onmouseup = function (e) {
        if (dragObj) {
            dragObj = null;

            window.removeEventListener('mousemove', dragObject, true);
            window.removeEventListener('touchmove', dragObject, true);
        }
    }
}
