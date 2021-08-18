<script>
export default {};
</script>

<template>
    <div class="trax-collections justify-content">
        <UIExtButton
            :theme="$store.state.config.trax.lists"
            @clicked="$parent.paginate('prev')"
            class="d-flex align-items-center me-1"
            :caption="`<i class='fas fa-chevron-left'></i>`"
        />
        <UIExtBorder
            :theme="$store.state.config.trax.borders"
            v-for="(c, i) in $store.state.trax.visibleCollection"
            :key="'a'+i"
            class="trax-collection"
        >
            <div class="trax-collection-header text-truncate overflow-hidden">
                <span class="d-block text-align-center">{{ c.name }}</span>
            </div>
            <div class="trax-collection-grid">
                <div
                    class="trax-collection-grid-item uiExt-button"
                    :theme="$store.state.config.trax.buttons"
                    :style="'background-color:' + c.colour"
                    v-for="(s, ind) in c.sets"
                    :key="'c' + ind"
                    @mouseenter="$parent.playSound(s.sound, true)"
                    @mouseleave="$parent.stopPlayingSound()"
                    @mousedown="$parent.registerSelected(s.sound, c.colour, s.set, ind)"
                />
            </div>
        </UIExtBorder>
        <UIExtButton
            :theme="$store.state.config.trax.lists"
            @clicked="$parent.paginate('next')"
            class="d-flex align-items-center"
            :caption="`<i class='fas fa-chevron-right'></i>`"
        />
    </div>
</template>