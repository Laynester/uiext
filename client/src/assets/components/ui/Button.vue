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
        v-html="caption"
    />
</template>