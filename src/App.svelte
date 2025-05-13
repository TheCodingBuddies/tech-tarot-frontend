<script lang="ts">
    import {fly} from 'svelte/transition';
    import {CardState} from "./main";
    import Stack from "./Stack.svelte";

    interface Card {
        name: string
        state: CardState;
        drawn: boolean;
    }

    let counter = $state(0);
    let drawnCards = $state<Card[]>([
        {name: "first", state: CardState.stack, drawn: false},
        {name: "second", state: CardState.stack, drawn: false},
        {name: "third", state: CardState.stack, drawn: false}
    ]);

    function getFlyAttributes(cardPosition: number): any {
        let stackRect = document.getElementById('stack')!.getBoundingClientRect();
        let cardRect = document.getElementById(`c-${cardPosition}`)!.getBoundingClientRect();
        return {
            x: -Math.abs(stackRect.x - cardRect.x),
            duration: (2000 / drawnCards.length) * (drawnCards.length - cardPosition)
        };
    }
</script>

<main>
    <section class="tech-tarot">
        <div class="game-area">
            <div class="card-placeholders">
                {#each drawnCards as card, i}
                    <div class="card placeholder">
                        {#if card.state !== CardState.stack}
                            <div class="flippable card {drawnCards[i].state === CardState.visible ? 'flipped': 'pattern'}"
                                 id={"c-" + i}
                                 role="button"
                                 tabindex="0"
                                 in:fly={getFlyAttributes(i)}
                                 onintroend={() => drawnCards[i].drawn = true}
                                 onkeydown={() => drawnCards[i].state = CardState.visible}
                                 onclick={() => drawnCards[i].state = CardState.visible}>
                                {#if drawnCards[i].drawn}
                                    <div class="front">
                                        <span class="symbol">CB</span>
                                    </div>
                                    <div class="back">
                                        <div class="pattern"></div>
                                    </div>
                                {/if}
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
            <Stack callback={() => drawnCards[counter++].state = CardState.hidden}></Stack>
        </div>
    </section>
</main>

<style>
    .tech-tarot {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .game-area {
        margin: 50px;
        display: flex;
        gap: 50px;
    }

    .card-placeholders {
        display: flex;
        gap: 10px
    }

    .flippable {
        position: relative;
        transform: rotateY(180deg);
        transition: transform 0.4s;
        transform-style: preserve-3d;
        padding: 0;
        user-select: none;
        cursor: pointer;
    }

    .card {
        height: 9cm;
        width: 6cm;
        border-radius: 12px;
        border: 2px solid white;
    }

    .flipped {
        transform: rotateY(0);
    }

    .placeholder {
        background-color: transparent;
        border-color: #575757;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .symbol {
        width: 100%;
        height: 100%;
        background-color: aquamarine;
    }

    .pattern {
        width: 100%;
        height: 100%;
        background-color: #575957;
        opacity: 1;
        background: radial-gradient(circle, transparent 20%, #575957 20%, #575957 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #575957 20%, #575957 80%, transparent 80%, transparent) 37.5px 37.5px, linear-gradient(#015100 3px, transparent 3px) 0 -1.5px, linear-gradient(90deg, #015100 3px, #575957 3px) -1.5px 0;
        background-size: 75px 75px, 75px 75px, 37.5px 37.5px, 37.5px 37.5px;
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
