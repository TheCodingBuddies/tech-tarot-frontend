<script lang="ts">
    import {CardState} from "./main";
    import Stack from "./Stack.svelte";
    import PlayCard from "./PlayCard.svelte";
    import {onMount} from "svelte";

    interface Card {
        name: string;
        id: string;
        state: CardState;
        drawn: boolean;
    }

    let counter = $state(0);
    let drawnCards = $state<Card[]>([]);
    let gameStarted = $state(false);

    onMount(() => {
        reset();
        const evtSource = new EventSource("http://localhost:8080/connect");
        evtSource.onmessage = (event) => {
            if (event.data.includes("game")) {
                gameStarted = true;
            }
            console.log(event.data);
        }
        evtSource.onerror = (error) => {
            console.log("error case:" + error);
        }
    })


    function next() {
        counter >= 3 ? reset() : draw();
    }

    function draw() {
        drawnCards[counter++].state = CardState.hidden
    }

    function reset() {
        fetch("http://localhost:8080/cards")
            .then(response => response.json())
            .then((cards: Card[]) => {
                drawnCards = cards.map(c => {
                    return {name: c.name, id: c.id, state: CardState.stack, drawn: false}
                });
            })
            .catch(error => console.log(error));
        counter = 0;
        gameStarted = false;
    }

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
    {#if gameStarted}
        <section class="tech-tarot">
            <div class="game-area">
                <div class="your-future">
                    {#each drawnCards as card, i}
                        <div class="card placeholder">
                            {#if card.state !== CardState.stack}
                                <PlayCard id={i} bind:card={drawnCards[i]} callback={getFlyAttributes(i)}></PlayCard>
                            {/if}
                        </div>
                    {/each}
                </div>
                <Stack {next}/>
            </div>
        </section>
    {/if}
</main>

<style>
    .tech-tarot {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .game-area {
        display: flex;
        gap: 50px;
    }

    .your-future {
        display: flex;
        gap: 10px
    }

    .placeholder {
        background-color: transparent;
        border-color: #575757;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
