<script lang="ts">
    import background from '/Deckblatt.png'
    let {next} = $props()

    function onKeydown(event : KeyboardEvent) {
        console.log(event.key)
        if (event.key == "d")
            next();
    }
</script>

<svelte:window onkeydown={onKeydown}></svelte:window>

<div class="card-stack" id="stack" role="button" tabindex="0" onclick={next} onkeydown={() => {}}>
    <img class="card tt-image card-3" src="{background}">
    <img class="card tt-image card-2" src="{background}">
    <img class="card tt-image card-1" src="{background}">
</div>

<style>
    .card-stack {
        position: relative;
        background-color: transparent;
        border: none;
        width: 6cm;
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
</style>
