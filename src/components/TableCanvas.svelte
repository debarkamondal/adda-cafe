<script>
	import { T, useTask } from '@threlte/core';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { useLoader } from '@threlte/core';
	const gltf = useLoader(GLTFLoader).load('/model/scene.gltf');

	let rotation = 0;
	useTask((delta) => {
		rotation += delta * 0.3;
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

{#if $gltf}
	<T
		is={$gltf.scene}
		scale={[1.5, 1.5, 1.5]}
		position={[0, -1.5, 0]}
		rotation.y={rotation}
		castShadow
	/>
{/if}
