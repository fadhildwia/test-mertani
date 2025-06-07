<script lang="ts">
	import DeviceIcon from '$lib/icons/DeviceIcon.svelte';
	import { navigationItems } from '$lib/navigation.ts';
  import { page } from '$app/stores'

	export let isCollapsed = false;

  function toggleSidebar() {
		isCollapsed = !isCollapsed;
	}
</script>

<div class="relative">
	<div
		class={`flex h-full overflow-hidden border-r border-[#e0e0e0] bg-white transition-all duration-300 ease-in-out ${
			isCollapsed ? 'w-12' : 'w-[280px]'
		}`}
	>
		<div
			class="flex min-h-screen w-12 flex-col items-center gap-4 border-r border-[#e0e0e0] bg-white py-2.5"
		>
			<img src="/logo.png" alt="Logo" class="h-10 w-10" />
			<button onclick={toggleSidebar} class="rounded bg-[#FFF5E5] p-[6px] cursor-pointer hover:bg-gray-200 ">
				<DeviceIcon size={24} color="none" />
			</button>
		</div>

		<div
			class={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${isCollapsed ? 'w-0' : 'w-[232px]'}`}
		>
			<div class="flex h-16 items-center border-b border-[#e0e0e0] bg-white">
				<div class="flex h-full items-center justify-center px-4">
					<span class="text-sm font-normal text-neutral-800"> Admin Dashboard </span>
				</div>
			</div>
			<div class="relative">
				<div
					class="flex h-full flex-col overflow-hidden border-r border-[#e0e0e0] bg-white transition-all duration-300 ease-in-out"
				>
					<div
						class="relative flex h-12 items-center justify-between border-b border-[#e0e0e0] bg-[#f1f3f5] px-4 py-2.5"
					>
						<h3 class="text-sm font-semibold whitespace-nowrap text-[#2c2c30]">Kelola Device</h3>
					</div>
				</div>
			</div>

			<div class="flex min-w-[206px] flex-col gap-2 p-4">
				{#each navigationItems as item}
					<a
						href={item.path}
						class="flex h-auto w-full items-center justify-start rounded-lg p-2 text-left transition-colors hover:bg-[#f5f5f5]
            {item.path === $page.url.pathname ? ' bg-[#eaecf0]' : ''}"
					>
						<span class="text-sm font-normal whitespace-nowrap text-[#2c2c30]">
							{item.label}
						</span>
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>
