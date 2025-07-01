<script lang="ts">
    import {CardState} from "./main";
    import {fly} from 'svelte/transition';
    import background from '/Deckblatt.png'

    let {id, card = $bindable(), callback} = $props()
</script>

<div class="flippable card"
     class:flipped={card.state === CardState.visible}
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
            <img class="tt-image" src={background}>
        </div>
    {:else}
        <img class="tt-image reverse" src="{background}">
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

    .reverse {
        transform: rotateY(-180deg);
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
