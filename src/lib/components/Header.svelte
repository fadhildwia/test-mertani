<script>
  import { pageTitle } from '$lib/stores/title.ts';
</script>

<header class="sticky top-0 z-0 flex h-16 w-full items-center border-b border-[#e0e0e0] bg-white">
	<div class="flex items-center px-6 py-2.5">
		<div class="text-sm leading-5 tracking-[0.04px]">
			<span class="tracking-[0.01px] text-neutral-600 cursor-pointer"> Manajemen Device </span>
			<span class="tracking-[0.01px] text-[#2c2c30]">
				{' '}
				/ {$pageTitle}
			</span>
		</div>
	</div>

	<div class="flex-1"></div>

	<div
		class="px-6 font-['Nunito_Sans',Helvetica] text-sm leading-5 font-medium tracking-[0.04px] text-[#2c2c30]"
	>
		Versi 1.0.0
	</div>
</header>
