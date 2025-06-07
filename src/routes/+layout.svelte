<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import DeviceIcon from '$lib/icons/DeviceIcon.svelte';
	import PinIcon from '$lib/icons/PinIcon.svelte';
	import '../app.css';
</script>

<div>
	<div class="flex h-screen w-full">
		<Sidebar />
		<div class="flex-1 flex flex-col relative">
			<Header />
			<div class="absolute -left-4 top-19 transition-colors rounded-md p-1 border border-gray-300">
				<PinIcon size={16} color="none" />
			</div>
			<main class="flex-1 overflow-y-auto p-4 z-0">
				<slot />
			</main>
		</div>
	</div>
</div>
