<template>
    <div class="canvas">
        <div class="resize-container" ref="resizeContainer">
            <span class="resize-handle resize-handle-nw" @mousedown="startResize"></span>
            <span class="resize-handle resize-handle-ne" @mousedown="startResize"></span>
            <img crossorigin="anonymous" class="resize-image" src="https://cdnuploads.aa.com.tr/uploads/Contents/2020/05/14/thumbs_b_c_88bedbc66bb57f0e884555e8250ae5f9.jpg?v=140708" ref="imageTarget" />
            <span class="resize-handle resize-handle-sw" @mousedown="startResize"></span>
            <span class="resize-handle resize-handle-se" @mousedown="startResize"></span>
        </div>
    </div>
</template>

<script>


export default {
    name: "KImageEditor",
    components: {
    },
    data() {
        return {
            origSrc: new Image(),
            eventState: {},
            constrain: false,
            minWidth: 6,
            minHeight: 6,
            maxWidth: 800000,
            maxHeight: 900000,
            resizeCanvas: document.createElement('canvas'),
        };
    },

    methods: {
        initialize() {
            // Create a new image with a copy of the original src
            // When resizing, we will always use this original copy as the base
            this.origSrc.src = this.$refs.imageTarget.src;
            this.origSrc.setAttribute('crossorigin', 'anonymous');
        },
        startResize(e) {
            e.preventDefault();
            this.saveEventState(e);
            e.stopPropagation();
            document.addEventListener('mousemove', this.resizing);
            document.addEventListener('touchmove', this.resizing);
            document.addEventListener( 'mouseup', this.endResize);
            document.addEventListener( 'touchend', this.endResize);
        },
        resizing(e) {
            let mouse = {};
            let width;
            let height;
            let left;
            let top;

            mouse.x = (e.clientX || e.pageX || e.changedTouches[0].clientX) + window.scrollX; // TODO
            mouse.y = (e.clientY || e.pageY || e.changedTouches[0].clientY) + window.scrollY; // TODO
            // Position image differently depending on the corner dragged and constraints
            if(this.eventState.evnt.target.classList.contains('resize-handle-se')){
                width = mouse.x - this.eventState.container_left;
                height = mouse.y  - this.eventState.container_top;
                left = this.$refs.resizeContainer.offsetLeft;
                top = this.$refs.resizeContainer.offsetTop;
            } else if(this.eventState.evnt.target.classList.contains('resize-handle-sw')){
                width = this.eventState.container_width - (mouse.x - this.eventState.container_left);
                height = mouse.y  - this.eventState.container_top;
                left = mouse.x;
                top = this.$refs.resizeContainer.offsetTop;
            } else if(this.eventState.evnt.target.classList.contains('resize-handle-nw')){
                width = this.eventState.container_width - (mouse.x - this.eventState.container_left);
                height = this.eventState.container_height - (mouse.y - this.eventState.container_top);
                left = mouse.x;
                top = mouse.y;
                if(this.constrain || e.shiftKey){
                    top = mouse.y - ((width / this.origSrc.width * this.origSrc.height) - height);
                }
            } else if(this.eventState.evnt.target.classList.contains('resize-handle-ne')){
                width = mouse.x - this.eventState.container_left;
                height = this.eventState.container_height - (mouse.y - this.eventState.container_top);
                left = this.eventState.container_left;
                top = mouse.y;
                if(this.constrain || e.shiftKey){
                    top = mouse.y - ((width / this.origSrc.width * this.origSrc.height) - height);
                }
            }

            if(this.constrain || e.shiftKey){
                height = width / this.origSrc.width * this.origSrc.height;
            }
            if(width > this.minWidth && height > this.minHeight && width < this.maxWidth && height < this.maxHeight) {
                this.resizeImage(width, height);
                // Without this Firefox will not re-calculate the the image dimensions until drag end
                this.$refs.resizeContainer.style.top = top + "px";
                this.$refs.resizeContainer.style.left = left + "px";
            }
        },
        resizeImage(width, height) {
            this.resizeCanvas.width = width;
            this.resizeCanvas.height = height;
            this.resizeCanvas.getContext('2d').drawImage(this.origSrc, 0, 0, width, height);
            this.$refs.imageTarget.src = this.resizeCanvas.toDataURL("image/png");
        },
        endResize(e) {
            e.preventDefault();
            document.removeEventListener('mouseup', this.endResize);
            document.removeEventListener('touchend', this.endResize);
            document.removeEventListener('mousemove', this.resizing);
            document.removeEventListener('touchmove', this.resizing);
        },
        saveEventState(e) {

            this.eventState.container_width = parseFloat(getComputedStyle(this.$refs.resizeContainer, null).width.replace("px", ""));
            this.eventState.container_height = parseFloat(getComputedStyle(this.$refs.resizeContainer, null).height.replace("px", ""));


            const rect = this.$refs.resizeContainer.getBoundingClientRect();
            this.eventState.container_left = rect.left + window.scrollX;
            this.eventState.container_top = rect.top + window.scrollY;

            this.eventState.mouse_x = (e.clientX || e.pageX || e.changedTouches[0].clientX) + window.scrollX; // TODO
            this.eventState.mouse_y = (e.clientY || e.pageY || e.changedTouches[0].clientY) + window.scrollY; // TODO
            // This is a fix for mobile safari
            // For some reason it does not allow a direct copy of the touches property
            if(typeof e.changedTouches !== 'undefined'){
                this.eventState.touches = [];
                e.changedTouches.forEach(function(i, ob){
                    this.eventState.touches[i] = {};
                    this.eventState.touches[i].clientX = 0 + ob.clientX;
                    this.eventState.touches[i].clientY = 0 + ob.clientY;
                }.bind(this));
            }
            this.eventState.evnt = e;
        }
    },

    mounted() {
        this.initialize();
    }

};
</script>

<style lang="scss">
    .canvas {
        position: relative;
        background-color: grey;
        height: 500px;
        border: 3px solid #49708A;
        max-width: 901px;
        overflow: hidden;
        margin: 0 auto;
    }
    /* Container images */
    .resize-container {
        position: relative;
        display: inline-block;
        cursor: move;
        margin: 0 auto;
    }

    .resize-container img {
        display: block
    }

    .resize-container:hover img,
    .resize-container:active img {
        outline: 2px dashed rgba(222,60,80,.9);
    }

    /* Handlers */
    .resize-handle-ne,
    .resize-handle-ne,
    .resize-handle-se,
    .resize-handle-nw,
    .resize-handle-sw {
        position: absolute;
        display: block;
        width: 10px;
        height: 10px;
        background: rgba(222,60,80,.9);
        z-index: 999;
    }

    .resize-handle-nw {
        top: -5px;
        left: -5px;
        cursor: nw-resize;
    }

    .resize-handle-sw {
        bottom: -5px;
        left: -5px;
        cursor: sw-resize;
    }

    .resize-handle-ne {
        top: -5px;
        right: -5px;
        cursor: ne-resize;
    }

    .resize-handle-se {
        bottom: -5px;
        right: -5px;
        cursor: se-resize;
    }
</style>
