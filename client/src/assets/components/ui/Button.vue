<script>
export default {
    props: ["theme", "caption", "colour"],
};
</script>

<template>
    <div
        class="uiExt-button"
        :class="colour ? `bg-${colour}`: ``"
        :theme="theme"
        @click="$emit('clicked')"
    >
        <span v-html="caption" />
    </div>
</template>