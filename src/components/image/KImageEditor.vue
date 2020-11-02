<template>
    <div class="resize-container" ref="resizeContainer">
        <span class="resize-handle resize-handle-nw" @mousedown="startResize"></span>
        <span class="resize-handle resize-handle-ne" @mousedown="startResize"></span>
        <img class="resize-image" src="https://cdnuploads.aa.com.tr/uploads/Contents/2020/05/14/thumbs_b_c_88bedbc66bb57f0e884555e8250ae5f9.jpg?v=140708" ref="imageTarget" />
        <span class="resize-handle resize-handle-se" @mousedown="startResize"></span>
        <span class="resize-handle resize-handle-sw" @mousedown="startResize"></span>
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
            minWidth: 60,
            minHeight: 60,
            maxWidth: 800,
            maxHeight: 900,
            resizeCanvas: document.createElement('canvas'),
        };
    },

    methods: {
        initialize() {
            // Create a new image with a copy of the original src
            // When resizing, we will always use this original copy as the base
            this.origSrc.src = this.$refs.imageTarget.src;
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
            // let offset = {
            //     top: this.$refs.resizeContainer.getBoundingClientRect().top + document.body.scrollTop,
            //     left: this.$refs.resizeContainer.getBoundingClientRect().left + document.body.scrollLeft,
            // };
            mouse.x = (e.clientX || e.pageX || e.changedTouches[0].clientX) + window.scrollLeft || 0; // TODO
            mouse.y = (e.clientY || e.pageY || e.changedTouches[0].clientY) + window.scrollTop || 0; // TODO

            width = mouse.x - this.eventState.container_left;
            height = mouse.y  - this.eventState.container_top;
            left = this.eventState.container_left;
            top = this.eventState.container_top;

            if(this.constrain || e.shiftKey){
                height = width / this.origSrc.width * this.origSrc.height;
            }
            if(width > this.minWidth && height > this.minHeight && width < this.maxWidth && height < this.maxHeight) {
                this.resizeImage(width, height);
                // Without this Firefox will not re-calculate the the image dimensions until drag end
                console.log(left);
                console.log(top);
                // this.$refs.resizeContainer.offset({'left': left, 'top': top}); // TODO
            }
        },
        resizeImage(width, height) {
            console.log(width);
            console.log(height);
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
            this.eventState.container_width = this.$refs.resizeContainer.width;
            this.eventState.container_height = this.$refs.resizeContainer.height;
            this.eventState.container_left = this.$refs.resizeContainer.offsetLeft;
            this.eventState.container_top = this.$refs.resizeContainer.offsetTop;
            this.eventState.mouse_x = (e.clientX || e.pageX || e.changedTouches[0].clientX) + window.scrollLeft || 0; // TODO
            this.eventState.mouse_y = (e.clientY || e.pageY || e.changedTouches[0].clientY) + window.scrollTop || 0; // TODO

            // This is a fix for mobile safari
            // For some reason it does not allow a direct copy of the touches property
            if(typeof e.changedTouches !== 'undefined'){
                this.eventState.touches = [];
                e.changedTouches.forEach(function(i, ob){
                    this.eventState.touches[i] = {};
                    this.eventState.touches[i].clientX = 0+ob.clientX;
                    this.eventState.touches[i].clientY = 0+ob.clientY;
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
