<script lang="ts">
	import ActionDropdown from '$lib/components/ActionDropdown.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import SearchFilter from '$lib/components/SearchFilter.svelte';
	import SensorModal from '$lib/components/SensorModal.svelte';
	import TableHeader from '$lib/components/TableHeader.svelte';
  import { pageTitle } from '$lib/stores/title.ts';
	import type { ModalMode, SensorInterface } from '$lib/types/sensor.ts';
  
  pageTitle.set('Sensor Device');

  // State management
  let sensors: SensorInterface[] = [
    {
      id: 1,
      nama: 'Rainfall',
      idSensor: 'HAHA-rnf1',
      faktorKalibrasi: 'x*0.2',
      satuan: 'mm',
      deskripsi: 'auto create'
    },
    {
      id: 2,
      nama: 'wind direction',
      idSensor: 'HAHA-windir',
      faktorKalibrasi: 'X*1.5',
      satuan: '°',
      deskripsi: 'auto create'
    },
    {
      id: 3,
      nama: 'water level',
      idSensor: 'Sensor Type B',
      faktorKalibrasi: '',
      satuan: 'm',
      deskripsi: 'auto create'
    }
  ];

  let filteredSensors: SensorInterface[] = [...sensors];
  let searchTerm: string = '';
  let searchField: string = 'nama';
  let currentPage: number = 1;
  let itemsPerPage: number = 5;
  let totalPages: number = 1;

  // Modal states
  let showModal: boolean = false;
  let modalMode: ModalMode = 'create';
  let currentSensor: SensorInterface = createEmptySensor();

  // Dropdown states
  let showActionDropdown: Record<number, boolean> = {};

  // Table configuration
  const tableColumns = [
    { key: 'nama', label: 'Nama Sensor', sortable: true },
    { key: 'idSensor', label: 'Id Sensor', sortable: true },
    { key: 'faktorKalibrasi', label: 'Faktor kalibrasi', sortable: true },
    { key: 'satuan', label: 'Satuan', sortable: true },
    { key: 'deskripsi', label: 'Deskripsi', sortable: false },
    { key: 'aksi', label: 'Aksi', sortable: false }
  ];

  // Helper functions
  function createEmptySensor(): SensorInterface {
    return {
      id: null,
      nama: '',
      idSensor: '',
      faktorKalibrasi: '',
      satuan: '',
      deskripsi: ''
    };
  }

  function getNextId(): number {
    const existingIds = sensors.map(s => s.id).filter((id): id is number => id !== null);
    return existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
  }

  // Calculate pagination
  $: {
    totalPages = Math.ceil(filteredSensors.length / itemsPerPage);
    if (currentPage > totalPages) currentPage = 1;
  }

  $: paginatedSensors = filteredSensors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Search functionality
  function handleSearch(): void {
    if (searchTerm.trim() === '') {
      filteredSensors = [...sensors];
    } else {
      filteredSensors = sensors.filter((sensor: SensorInterface) => {
        const term = searchTerm.toLowerCase();
        switch (searchField) {
          case 'nama':
            return sensor.nama.toLowerCase().includes(term);
          case 'idSensor':
            return sensor.idSensor.toLowerCase().includes(term);
          case 'satuan':
            return sensor.satuan.toLowerCase().includes(term);
          default:
            return sensor.nama.toLowerCase().includes(term) ||
                   sensor.idSensor.toLowerCase().includes(term);
        }
      });
    }
    currentPage = 1;
  }

  // Modal functions
  function openCreateModal(): void {
    modalMode = 'create';
    currentSensor = createEmptySensor();
    showModal = true;
  }

  function openEditModal(sensor: SensorInterface): void {
    modalMode = 'edit';
    currentSensor = { ...sensor };
    showModal = true;
    showActionDropdown = {};
  }

  function closeModal(): void {
    showModal = false;
    currentSensor = createEmptySensor();
  }

  function saveSensor(): void {
    if (modalMode === 'create') {
      const newSensor: SensorInterface = {
        ...currentSensor,
        id: getNextId()
      };
      sensors = [...sensors, newSensor];
    } else {
      sensors = sensors.map((sensor: SensorInterface) =>
        sensor.id === currentSensor.id ? currentSensor : sensor
      );
    }
    
    filteredSensors = [...sensors];
    handleSearch();
    closeModal();
  }

  function deleteSensor(id: number): void {
    sensors = sensors.filter((sensor: SensorInterface) => sensor.id !== id);
    filteredSensors = [...sensors];
    handleSearch();
    showActionDropdown = {};
  }

  function calibrateSensor(id: number): void {
    alert(`Kalibrasi sensor dengan ID: ${id}`);
    showActionDropdown = {};
  }

  function toggleDropdown(id: number): void {
    showActionDropdown = { [id]: !showActionDropdown[id] };
  }

  function handlePageChange(page: number): void {
    currentPage = page;
  }

  function handleItemsPerPageChange(): void {
    handleSearch();
  }

  // Close dropdown when clicking outside
  function handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      showActionDropdown = {};
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="font-inter space-y-6 rounded-xl bg-white p-6 shadow-sm">
  <!-- Header -->
  <div class="flex items-center justify-between border-b border-[#E0E0E0] pb-5">
    <h1 class="text-xl font-semibold text-[#2C2C30]">Manajemen Sensor</h1>
    <button
      on:click={openCreateModal}
      class="bg-[#FFA000] hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors duration-200"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      Tambah Sensor
    </button>
  </div>

  <!-- Search Section -->
  <div class="space-y-4">
    <SearchFilter 
      bind:searchTerm
      bind:searchField
      onSearch={handleSearch}
    />
  </div>

  <!-- Table -->
  <div class="bg-white rounded-lg border border-[#E0E0E0] overflow-hidden">
    <table class="w-full">
      <TableHeader columns={tableColumns} />
      <tbody class="bg-white divide-y divide-[#E0E0E0]">
        {#each paginatedSensors as sensor (sensor.id)}
          <tr class="hover:bg-[#F8F9FA]">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-[#212529] font-medium">{sensor.nama}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-[#212529]">{sensor.idSensor}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-[#212529]">
              {#if sensor.faktorKalibrasi === ''}
                <span class="bg-[#E9ECEF] text-[#6C757D] px-2 py-1 rounded text-xs">
                  Belum dikalibrasi
                </span>
              {:else}
                {sensor.faktorKalibrasi}
              {/if}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-[#212529]">{sensor.satuan}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-[#6C757D]">{sensor.deskripsi}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-[#6C757D]">
              <ActionDropdown
                isOpen={showActionDropdown[sensor.id as number] || false}
                onToggle={() => toggleDropdown(sensor.id as number)}
                onEdit={() => openEditModal(sensor)}
                onCalibrate={() => calibrateSensor(sensor.id as number)}
                onDelete={() => deleteSensor(sensor.id as number)}
              />
            </td>
          </tr>
        {/each}
      </tbody>
    </table>

    <!-- Pagination -->
    <Pagination
      bind:currentPage
      bind:itemsPerPage
      {totalPages}
      onPageChange={handlePageChange}
      onItemsPerPageChange={handleItemsPerPageChange}
    />
  </div>
</div>

<!-- Modal -->
<SensorModal
  bind:isOpen={showModal}
  mode={modalMode}
  bind:sensor={currentSensor}
  onSave={saveSensor}
  onClose={closeModal}
/>