<script lang="ts">
export default {
    props: ["theme"],
};
</script>

<template>
    <div class="uiExt-border" :theme="theme">
        <slot />
    </div>
</template>