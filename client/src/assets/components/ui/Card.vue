<script>
export default {
    props: ["theme", "title", "center"],
    data() {
        return {
            positions: {
                clientX: undefined,
                clientY: undefined,
                movementX: 0,
                movementY: 0,
            },
        };
    },
    mounted() {
        if (this.$props.center) {
            this.centerDiv();
        }
    },
    methods: {
        dragMouseDown: function (event) {
            event.preventDefault();
            // get the mouse cursor position at startup:
            this.positions.clientX = event.clientX;
            this.positions.clientY = event.clientY;
            document.onmousemove = this.elementDrag;
            document.onmouseup = this.closeDragElement;
        },
        elementDrag: function (event) {
            event.preventDefault();
            this.positions.movementX = this.positions.clientX - event.clientX;
            this.positions.movementY = this.positions.clientY - event.clientY;
            this.positions.clientX = event.clientX;
            this.positions.clientY = event.clientY;
            // set the element's new position:
            this.$refs.draggableContainer.style.top =
                this.$refs.draggableContainer.offsetTop -
                this.positions.movementY +
                "px";
            this.$refs.draggableContainer.style.left =
                this.$refs.draggableContainer.offsetLeft -
                this.positions.movementX +
                "px";
        },
        closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        },
        centerDiv() {
            let div = this.$refs["draggableContainer"];
            let dWidth = div.offsetWidth / 2;
            let bWidth = document.body.offsetWidth / 2;
            let dHeight = div.offsetHeight / 2;
            let bHeight = document.body.offsetHeight / 2;
            div.style.left = bWidth - dWidth + "px";
            div.style.top = bHeight - dHeight + "px";
            console.log(dWidth);
        },
    },
};
</script>

<template>
    <div
        class="uiExt-card position-absolute d-flex flex-column"
        :theme="theme"
        ref="draggableContainer"
    >
        <div class="uiExt-cardHeader" @mousedown="dragMouseDown">
            <span v-html="title" />
            <div class="uiExt-cardClose" @click="$emit('clicked')" />
        </div>
        <div class="uiExt-cardBody h-100 overflow-hidden">
            <slot />
        </div>
    </div>
</template>