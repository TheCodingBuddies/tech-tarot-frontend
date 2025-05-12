<script lang="ts">
    import {fly} from 'svelte/transition';
    import {CardState} from "./main";
    import Counter from "./lib/Counter.svelte";

    interface Card {
        name: string
        state: CardState;
    }

    let counter = $state(0);
    let drawnCards = $state<Card[]>([
        {name: "first", state: CardState.stack},
        {name: "second", state: CardState.stack},
        {name: "third", state: CardState.stack}
    ]);

    function getFlyAttributes(cardPosition: number): any {
        let stackRect = document.getElementById('stack')!.getBoundingClientRect();
        let cardRect = document.getElementById(`c-${cardPosition}`)!.getBoundingClientRect();
        return {x:Math.abs(stackRect.x - cardRect.x), duration: (2000/drawnCards.length)*(drawnCards.length - cardPosition)};
    }
</script>

<main>
    <!--        Todo: center -->
    <div class="game-area">
        <div class="card-placeholders">
            {#each drawnCards as card, i}
                <div class="card placeholder">
                    {#if card.state !== CardState.stack}
                        <!--        Todo: flip animation -->
                        <div class="card {(card.state === CardState.visible) ? 'visible' : 'hidden'}" id={"c-" + i} role="button" tabindex="0" onclick={() => drawnCards[i].state = CardState.visible} onkeydown={() => drawnCards[i].state = CardState.visible} in:fly={getFlyAttributes(i)}></div>
                    {/if}
                </div>
            {/each}
        </div>
<!--        Todo: Stack auslagern -->
        <div class="stack" id="stack" role="button" tabindex="0"
             onclick={() => drawnCards[counter++].state = CardState.hidden}
             onkeydown={() => drawnCards[counter++].state = CardState.hidden}>
            <div class="card hidden card-3"></div>
            <div class="card hidden card-2"></div>
            <div class="card hidden card-1"></div>
        </div>
    </div>
</main>

<style>
    .game-area {
        margin: 50px;
        display: flex;
        gap: 50px;
    }

    .card-placeholders {
        display: flex;
        gap: 10px
    }

    .stack {
        position: relative;
        background-color: transparent;
        border: none;
    }

    .card-1 {
        position: absolute;
        top: 0;
        left: 0;
        rotate: 4deg;
    }

    .card-2 {
        position: absolute;
        top: 3px;
        left: 3px;
        rotate: 10deg;
    }

    .card-3 {
        position: absolute;
        top: 6px;
        left: 6px;
        rotate: 1deg;
    }

    .card {
        height: 9cm;
        width: 6cm;
        border-radius: 12px;
        border: 2px solid;
    }

    .placeholder {
        background-color: transparent;
        border-color: #575757;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .hidden {
        background-color: #575957;
        opacity: 1;
        background: radial-gradient(circle, transparent 20%, #575957 20%, #575957 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #575957 20%, #575957 80%, transparent 80%, transparent) 37.5px 37.5px, linear-gradient(#015100 3px, transparent 3px) 0 -1.5px, linear-gradient(90deg, #015100 3px, #575957 3px) -1.5px 0;
        background-size: 75px 75px, 75px 75px, 37.5px 37.5px, 37.5px 37.5px;
    }

    .visible {
        background-color: aquamarine;
    }

</style>
