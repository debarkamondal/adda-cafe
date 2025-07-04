<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { useLoader } from '@threlte/core';
	import type { Group, Object3DEventMap } from 'three';
	const tableModel = useLoader(GLTFLoader).load('/model/table/scene.gltf');
	const cupModel = useLoader(GLTFLoader).load('/model/cup/scene.gltf');

	const radius = 2; // The distance of the object from the central point.
	const speed = 0.3; // How fast the object orbits.

	let angle = 0;
	let rotation = $state(0);
	let cupCoords: [x: number, y: number, z: number] = $state([2, 3.8, 1.2]);
	let cup = $state<Group<Object3DEventMap>>();

	useTask((delta) => {
		rotation += delta * speed;
		angle += delta * speed;
		cupCoords = [radius * Math.sin(angle) + 0.5, cupCoords[1], radius * Math.cos(angle)];
	});
</script>

<T.PerspectiveCamera
	makeDefault
	position={[10, 10, 1]}
	oncreate={(ref) => {
		ref.lookAt(0, 1, 0);
	}}
/>
<T.DirectionalLight intensity={2.5} castShadow position={[0, 10, 10]} />

{#if $cupModel}
	<T is={$cupModel.scene} scale={[6, 6, 6]} bind:ref={cup} position={cupCoords} />
{/if}
{#if $tableModel}
	<T is={$tableModel.scene} scale={[1.5, 1.5, 1.5]} position={[0, -1.5, 0]} rotation.y={rotation} />
{/if}
