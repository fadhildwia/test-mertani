<script lang="ts">
	import FullscreenIcon from '$lib/icons/FullscreenIcon.svelte';
	import { pageTitle } from '$lib/stores/title.ts';
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	pageTitle.set('Detail Pemantauan');

	interface Sensor {
		name: string;
		color: string;
		bgColor: string;
		borderColor: string;
		active: boolean;
		key: string;
	}

	interface TableData {
		date: string;
		rainfall: number;
		waterLevel: number;
		windDirection: number;
	}

	interface ChartDataPoint {
		time: string;
		rainfall: number;
		waterLevel: number;
		windDirection: number;
	}

	let selectedSensors: Sensor[] = [
		{
			name: 'Water Level',
			color: 'bg-orange-500',
			bgColor: 'rgba(249, 115, 22, 0.1)',
			borderColor: '#f97316',
			active: true,
			key: 'waterLevel'
		},
		{
			name: 'Rainfall',
			color: 'bg-blue-500',
			bgColor: 'rgba(59, 130, 246, 0.1)',
			borderColor: '#3b82f6',
			active: true,
			key: 'rainfall'
		},
		{
			name: 'Wind Direction',
			color: 'bg-red-500',
			bgColor: 'rgba(239, 68, 68, 0.1)',
			borderColor: '#ef4444',
			active: true,
			key: 'windDirection'
		}
	];
	let stagedSensors: Sensor[] = [...selectedSensors];

	let selectAll = true;
	let startDate: string = '2025-10-30T00:00';
	let endDate: string = '2025-11-04T23:00';
	let selectedDataFilter: string = 'Semua Data';
	let showSensorDropdown: boolean = false;
	let showDataDropdown: boolean = false;
	let chartInstance: Chart | null = null;

	const allChartData: ChartDataPoint[] = [
		{ time: '2025-10-30T08:00', rainfall: 5, waterLevel: 75, windDirection: 76 },
		{ time: '2025-10-30T09:00', rainfall: 8, waterLevel: 80, windDirection: 78 },
		{ time: '2025-10-30T10:00', rainfall: 12, waterLevel: 85, windDirection: 74 },
		{ time: '2025-10-30T11:00', rainfall: 15, waterLevel: 82, windDirection: 72 },
		{ time: '2025-10-30T12:00', rainfall: 10, waterLevel: 78, windDirection: 75 },
		{ time: '2025-10-30T13:00', rainfall: 6, waterLevel: 76, windDirection: 77 },
		{ time: '2025-10-30T14:00', rainfall: 3, waterLevel: 80, windDirection: 76 },
		{ time: '2025-10-30T15:00', rainfall: 0, waterLevel: 85, windDirection: 74 },
		{ time: '2025-10-30T16:00', rainfall: 2, waterLevel: 88, windDirection: 73 },
		{ time: '2025-10-30T17:00', rainfall: 7, waterLevel: 84, windDirection: 75 },
		{ time: '2025-10-30T18:00', rainfall: 4, waterLevel: 82, windDirection: 76 },
		{ time: '2025-11-01T08:00', rainfall: 0, waterLevel: 70, windDirection: 78 },
		{ time: '2025-11-01T09:00', rainfall: 3, waterLevel: 72, windDirection: 80 },
		{ time: '2025-11-01T10:00', rainfall: 8, waterLevel: 75, windDirection: 76 },
		{ time: '2025-11-01T11:00', rainfall: 12, waterLevel: 78, windDirection: 74 },
		{ time: '2025-11-01T12:00', rainfall: 5, waterLevel: 80, windDirection: 72 },
		{ time: '2025-11-01T13:00', rainfall: 2, waterLevel: 82, windDirection: 75 },
		{ time: '2025-11-01T14:00', rainfall: 0, waterLevel: 85, windDirection: 77 },
		{ time: '2025-11-01T15:00', rainfall: 1, waterLevel: 87, windDirection: 79 },
		{ time: '2025-11-01T16:00', rainfall: 6, waterLevel: 84, windDirection: 76 },
		{ time: '2025-11-01T17:00', rainfall: 9, waterLevel: 81, windDirection: 74 },
		{ time: '2025-11-02T08:00', rainfall: 15, waterLevel: 90, windDirection: 70 },
		{ time: '2025-11-02T09:00', rainfall: 20, waterLevel: 95, windDirection: 68 },
		{ time: '2025-11-02T10:00', rainfall: 18, waterLevel: 92, windDirection: 69 },
		{ time: '2025-11-02T11:00', rainfall: 12, waterLevel: 88, windDirection: 71 },
		{ time: '2025-11-02T12:00', rainfall: 8, waterLevel: 85, windDirection: 73 },
		{ time: '2025-11-02T13:00', rainfall: 5, waterLevel: 82, windDirection: 75 },
		{ time: '2025-11-02T14:00', rainfall: 3, waterLevel: 79, windDirection: 77 },
		{ time: '2025-11-02T15:00', rainfall: 1, waterLevel: 76, windDirection: 78 },
		{ time: '2025-11-02T16:00', rainfall: 0, waterLevel: 74, windDirection: 79 },
		{ time: '2025-11-02T17:00', rainfall: 2, waterLevel: 73, windDirection: 80 }
	];

	// Data filter options
	const dataFilterOptions: string[] = [
		'Semua Data',
		'Data Hari Ini',
		'Data Minggu Ini',
		'Data Bulan Ini'
	];

	// Reactive statements
	$: filteredData = getFilteredData();
	$: tableData = getTableData();
	$: activeSensors = selectedSensors.filter((sensor) => sensor.active);

	onMount(() => {
		initChart();
		return () => {
			if (chartInstance) {
				chartInstance.destroy();
			}
		};
	});

	// Watch for changes in data and update chart
	$: if (chartInstance && (filteredData || activeSensors)) {
		updateChart();
	}

	function getFilteredData(): ChartDataPoint[] {
		let filtered = allChartData;

		// Filter by date range
		const start = new Date(startDate);
		const end = new Date(endDate);

		filtered = filtered.filter((item) => {
			const itemDate = new Date(item.time);
			return itemDate >= start && itemDate <= end;
		});

		// Filter by data filter option
		if (selectedDataFilter === 'Data Hari Ini') {
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			const tomorrow = new Date(today);
			tomorrow.setDate(tomorrow.getDate() + 1);

			filtered = filtered.filter((item) => {
				const itemDate = new Date(item.time);
				return itemDate >= today && itemDate < tomorrow;
			});
		} else if (selectedDataFilter === 'Data Minggu Ini') {
			const now = new Date();
			const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
			startOfWeek.setHours(0, 0, 0, 0);

			filtered = filtered.filter((item) => {
				const itemDate = new Date(item.time);
				return itemDate >= startOfWeek;
			});
		} else if (selectedDataFilter === 'Data Bulan Ini') {
			const now = new Date();
			const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

			filtered = filtered.filter((item) => {
				const itemDate = new Date(item.time);
				return itemDate >= startOfMonth;
			});
		}

		return filtered.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
	}

	function getTableData(): TableData[] {
		return filteredData.slice(0, 10).map((item) => ({
			date: formatDateTime(item.time),
			rainfall: item.rainfall,
			waterLevel: item.waterLevel,
			windDirection: item.windDirection
		}));
	}

	function formatDateTime(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleString('id-ID', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function initChart(): void {
		const ctx = document.getElementById('monitoringChart') as HTMLCanvasElement;
		if (!ctx) return;

		chartInstance = new Chart(ctx, {
			type: 'line',
			data: {
				labels: [],
				datasets: []
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						mode: 'index',
						intersect: false,
						backgroundColor: 'rgba(0, 0, 0, 0.8)',
						titleColor: 'white',
						bodyColor: 'white',
						borderColor: 'rgba(255, 255, 255, 0.2)',
						borderWidth: 1,
						callbacks: {
							label: function (context) {
								const sensor = selectedSensors.find((s) => s.name === context.dataset.label);
								let unit = '';
								if (sensor) {
									switch (sensor.key) {
										case 'rainfall':
											unit = ' mm';
											break;
										case 'waterLevel':
											unit = ' cm';
											break;
										case 'windDirection':
											unit = '°';
											break;
									}
								}
								return `${context.dataset.label}: ${context.parsed.y}${unit}`;
							}
						}
					}
				},
				scales: {
					x: {
						display: true,
						grid: {
							color: 'rgba(0, 0, 0, 0.05)'
						},
						ticks: {
							maxTicksLimit: 8
						}
					},
					y: {
						display: true,
						grid: {
							color: 'rgba(0, 0, 0, 0.05)'
						},
						min: 0,
						max: 100
					}
				},
				interaction: {
					mode: 'nearest',
					axis: 'x',
					intersect: false
				}
			}
		});

		updateChart();
	}

	function updateChart(): void {
		if (!chartInstance) return;

		const labels = filteredData.map((item) => {
			const date = new Date(item.time);
			return date.toLocaleTimeString('id-ID', {
				hour: '2-digit',
				minute: '2-digit',
				day: '2-digit',
				month: '2-digit'
			});
		});

		const datasets = activeSensors.map((sensor) => ({
			label: sensor.name,
			data: filteredData.map((item) => item[sensor.key as keyof ChartDataPoint] as number),
			borderColor: sensor.borderColor,
			backgroundColor: sensor.bgColor,
			tension: 0.4,
			fill: false,
			pointRadius: 4,
			pointHoverRadius: 6
		}));

		chartInstance.data.labels = labels;
		chartInstance.data.datasets = datasets;
		chartInstance.update('active');
	}

	function toggleSensorDropdown(): void {
		showSensorDropdown = !showSensorDropdown;
		showDataDropdown = false;
	}

	function toggleDataDropdown(): void {
		showDataDropdown = !showDataDropdown;
		showSensorDropdown = false;
	}

	function toggleSelectAll() {
		stagedSensors = stagedSensors.map((s) => ({ ...s, active: selectAll }));
	}

	function applySelection(): void {
		selectedSensors = [...stagedSensors];
		showSensorDropdown = false;
		updateChart();
	}

	function downloadData(): void {
		const csvContent = generateCSV();
		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.setAttribute('href', url);
		link.setAttribute('download', `sensor_data_${new Date().toISOString().split('T')[0]}.csv`);
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	function generateCSV(): string {
		const headers = ['Tanggal & Waktu', 'Rainfall (mm)', 'Water Level (cm)', 'Wind Direction (°)'];
		const rows = filteredData.map((item) => [
			formatDateTime(item.time),
			item.rainfall,
			item.waterLevel,
			item.windDirection
		]);

		return [headers, ...rows].map((row) => row.join(',')).join('\n');
	}

	function toggleSensor(selectSensor: Sensor): void {
		stagedSensors = stagedSensors.map((s) =>
			s.key === selectSensor.key ? { ...s, active: selectSensor.active } : s
		);

		selectAll = stagedSensors.every((s) => s.active);
	}

	function handleDateChange(): void {
		filteredData = getFilteredData();
	}
</script>

<div class="font-inter space-y-6 rounded-xl bg-white p-6 shadow-sm">
	<div class="flex items-center justify-between border-b border-[#E0E0E0] pb-5">
		<div class="flex flex-col gap-1.5">
			<div class="flex items-center gap-4">
				<h2 class="text-lg font-semibold text-[#2C2C30]">Nama Device</h2>
				<span
					class="rounded border border-[#12B76A] bg-[#C9FFE6] px-2 py-0.5 text-xs text-[#12B76A]"
					>Online</span
				>
			</div>
			<p class="text-sm text-[#2C2C30]">Id Device</p>
		</div>
		<div class="flex items-center gap-2">
			<button
				class="cursor-pointer rounded border border-[#F8F9FA] p-2.5 hover:bg-[#F5F5F5]"
				aria-label="Fullscreen"
			>
				<FullscreenIcon />
			</button>
		</div>
	</div>

	<!-- Controls -->
	<div class="flex flex-wrap items-center justify-between gap-4">
		<!-- Sensor Selection -->
		<div class="dropdown-container relative">
			<button
				on:click={toggleSensorDropdown}
				class="inline-flex items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 focus:outline-none"
			>
				<img class="h-5 w-5" alt="input-prefix" src="/input-prefix.svg" />
				Pilih Sensor
			</button>

			{#if showSensorDropdown}
				<div
					class="absolute top-full left-0 z-10 mt-2 w-56 rounded-md border border-gray-200 bg-white p-4 shadow-lg"
				>
					<div class="mb-3 flex items-center justify-between">
						<span class="font-medium text-gray-700">Pilih Sensor</span>
						<button
							on:click={toggleSensorDropdown}
							class="text-gray-400 hover:text-gray-600"
							aria-label="Tutup Pilihan Sensor"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
					<div class="border-b border-[#E0E0E0]"></div>
					{#each stagedSensors as sensor}
						<label class="flex cursor-pointer items-center space-x-3 rounded py-2 hover:bg-gray-50">
							<input
								type="checkbox"
								bind:checked={sensor.active}
								on:change={() => toggleSensor(sensor)}
								class="accent-[#FFA000]/25"
							/>
							<span class="text-sm text-gray-700">{sensor.name}</span>
						</label>
					{/each}
					<label class="mt-2 flex items-center gap-2 border-t border-[#E0E0E0] pt-2 text-gray-700">
						<input
							type="checkbox"
							bind:checked={selectAll}
							on:change={toggleSelectAll}
							class="accent-[#FFA000]/25"
						/>
						<span>Pilih Semua</span>
					</label>
					<button
						on:click={applySelection}
						class="mt-4 w-full rounded-md bg-[#FFA000] py-2 text-sm font-medium text-white hover:bg-orange-600"
					>
						Tampilkan
					</button>
				</div>
			{/if}
		</div>

		<div class="flex items-center space-x-3">
			<!-- Date Range Picker -->
			<div class="inline-flex items-center rounded-md border border-gray-300 px-3 py-2">
				<input
					type="datetime-local"
					bind:value={startDate}
					on:change={handleDateChange}
					class="border-none bg-transparent text-sm text-gray-600 outline-none"
				/>
				<svg class="mx-2 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
					<path
						fill-rule="evenodd"
						d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
						clip-rule="evenodd"
					/>
				</svg>
				<input
					type="datetime-local"
					bind:value={endDate}
					on:change={handleDateChange}
					class="border-none bg-transparent text-sm text-gray-600 outline-none"
				/>
			</div>

			<!-- Data Filter -->
			<div class="dropdown-container relative">
				<button
					on:click={toggleDataDropdown}
					class="inline-flex items-center rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				>
					{selectedDataFilter}
					<svg class="ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>

				{#if showDataDropdown}
					<div
						class="absolute top-full right-0 z-10 mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg"
					>
						<div class="py-1">
							{#each dataFilterOptions as option}
								<button
									on:click={() => {}}
									class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 {selectedDataFilter ===
									option
										? 'bg-blue-50 text-blue-700'
										: ''}"
								>
									{option}
								</button>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<!-- Download Button -->
			<button
				on:click={downloadData}
				class="inline-flex items-center rounded-md border border-gray-300 px-3 py-2 text-gray-600 transition-colors hover:bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				title="Download CSV"
				aria-label="Download CSV"
			>
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
					<path
						fill-rule="evenodd"
						d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</div>
	</div>

	<!-- Chart Section -->
	{#if activeSensors.length === 0}
		<div class="flex flex-col items-center py-12 text-center">
			<img class="h-80 w-80" alt="empty-graph" src="/empty-graph.svg" />
			<p class="mb-2 text-lg font-medium text-[#1D2939]">
				Pilih sensor diatas untuk menampilkan grafik & tabel data!
			</p>
			<p class="text-sm text-[#667085]">
				Anda dapat menentukan rentang waktu dan mengelompokkan data sesuai kebutuhan.
			</p>
		</div>
	{:else}
		<div class="mb-4">
			<div class="mb-2 flex items-center justify-between">
				<h3 class="text-lg font-medium text-gray-900">Grafik Pemantauan Sensor</h3>
				<div class="text-sm text-gray-500">
					Data: {filteredData.length} records | Periode: {formatDateTime(
						filteredData[0]?.time || ''
					)} - {formatDateTime(filteredData[filteredData.length - 1]?.time || '')}
				</div>
			</div>
		</div>

		<!-- Chart Container -->
		<div class="relative h-96">
			<canvas id="monitoringChart"></canvas>
		</div>

		<!-- Legend -->
		<div class="mt-4 flex flex-wrap items-center justify-center gap-6">
			{#each activeSensors as sensor}
				<div class="flex items-center space-x-2">
					<div class="h-3 w-3 rounded {sensor.color}"></div>
					<span class="text-sm text-gray-600">{sensor.name}</span>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Data Table -->
	<div class="rounded-lg border border-gray-200 bg-white shadow-sm">
		<div class="border-b border-gray-200 px-6 py-4">
			<h3 class="text-lg font-medium text-gray-900">Data Pemantauan</h3>
		</div>
		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>
							Tanggal & Waktu
						</th>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>
							Rainfall (mm)
						</th>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>
							Water Level (cm)
						</th>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>
							Wind Direction (°)
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each tableData as row}
						<tr class="hover:bg-gray-50">
							<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
								{row.date}
							</td>
							<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
								{row.rainfall}
							</td>
							<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
								{row.waterLevel}
							</td>
							<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
								{row.windDirection}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<style>
	input[type='datetime-local'] {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
	}
</style>
