<script lang="ts">
    import {CardState} from "./main";
    import {fly} from 'svelte/transition';

    let {id, card = $bindable(), callback} = $props()
</script>

<div class="flippable card {card.state === CardState.visible ? 'flipped': 'pattern'}"
     id={"c-" + id}
     role="button"
     tabindex="0"
     in:fly={callback}
     onintroend={() => card.drawn = true}
     onkeydown={() => card.state = CardState.visible}
     onclick={() => card.state = CardState.visible}>
    {#if card.drawn}
        <div class="front">
            <img class="tt-image" src="http://localhost:8080/image?id=1">
        </div>
        <div class="back">
            <div class="pattern"></div>
        </div>
    {/if}
</div>

<style>
    .flippable {
        position: relative;
        transform: rotateY(180deg);
        transition: transform 0.4s;
        transform-style: preserve-3d;
        padding: 0;
        user-select: none;
        cursor: pointer;
    }

    .flipped {
        transform: rotateY(0);
    }

    .tt-image {
        width: 100%;
        height: 100%;
    }

    .symbol {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        font-size: 52px;
        font-weight: bold;
        font-family: Rockwell,serif;
        color: #0c323b;
        background-color: aquamarine;
    }

    .back, .front {
        overflow: hidden;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        backface-visibility: hidden;
    }

    .back {
        transform: rotateY(180deg);
    }

</style>
