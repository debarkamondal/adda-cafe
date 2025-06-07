<script>
	import AddToCartButton from './AddToCartButton.svelte';
	import { cart } from '../routes/cart.svelte';
</script>

<main class="mx-1 my-4 space-y-2">
	<div class="bg-secondary-900 flex gap-4 rounded-md p-2">
		<img src="/tea-cup.jpg" alt="tea cup" class="h-24 rounded-md object-scale-down" />
		<div class="my-2 grow">
			<p class="text-lg font-semibold">White Tea</p>
			<span class="self-center font-semibold">&#8377;10</span>
		</div>
		<AddToCartButton item={cart.items[0]} />
	</div>
	<div class="bg-secondary-900 flex gap-4 rounded-md p-2">
		<img src="/tea-cup.jpg" alt="tea cup" class="h-24 rounded-md object-scale-down" />
		<div class="my-2 grow">
			<p class="text-lg font-semibold">White Tea</p>
			<span class="self-center font-semibold">&#8377;10</span>
		</div>
		<AddToCartButton item={cart.items[0]} />
	</div>
	<div class="bg-secondary-900 flex gap-4 rounded-md p-2">
		<img src="/tea-cup.jpg" alt="tea cup" class="h-24 rounded-md object-scale-down" />
		<div class="my-2 grow">
			<p class="text-lg font-semibold">White Tea</p>
			<span class="self-center font-semibold">&#8377;10</span>
		</div>
		<AddToCartButton item={cart.items[0]} />
	</div>
	<div class="bg-secondary-900 flex gap-4 rounded-md p-2">
		<img src="/tea-cup.jpg" alt="tea cup" class="h-24 rounded-md object-scale-down" />
		<div class="my-2 grow">
			<p class="text-lg font-semibold">White Tea</p>
			<span class="self-center font-semibold">&#8377;10</span>
		</div>
		<AddToCartButton item={cart.items[0]} />
	</div>
	<div class="bg-secondary-900 flex gap-4 rounded-md p-2">
		<img src="/tea-cup.jpg" alt="tea cup" class="h-24 rounded-md object-scale-down" />
		<div class="my-2 grow">
			<p class="text-lg font-semibold">White Tea</p>
			<span class="self-center font-semibold">&#8377;10</span>
		</div>
		<AddToCartButton item={cart.items[0]} />
	</div>
	<div class="bg-secondary-900 flex gap-4 rounded-md p-2">
		<img src="/tea-cup.jpg" alt="tea cup" class="h-24 rounded-md object-scale-down" />
		<div class="my-2 grow">
			<p class="text-lg font-semibold">White Tea</p>
			<span class="self-center font-semibold">&#8377;10</span>
		</div>
		<AddToCartButton item={cart.items[0]} />
	</div>
	<div class="bg-secondary-900 flex gap-4 rounded-md p-2">
		<img src="/tea-cup.jpg" alt="tea cup" class="h-24 rounded-md object-scale-down" />
		<div class="my-2 grow">
			<p class="text-lg font-semibold">White Tea</p>
			<span class="self-center font-semibold">&#8377;10</span>
		</div>
		<AddToCartButton item={cart.items[0]} />
	</div>
	<div class="bg-secondary-900 flex gap-4 rounded-md p-2">
		<img src="/tea-cup.jpg" alt="tea cup" class="h-24 rounded-md object-scale-down" />
		<div class="my-2 grow">
			<p class="text-lg font-semibold">White Tea</p>
			<span class="self-center font-semibold">&#8377;10</span>
		</div>
		<AddToCartButton item={cart.items[0]} />
	</div>
</main>
