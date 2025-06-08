<script>
  import { pageTitle } from '$lib/stores/title.ts';
  import SettingIcon from '$lib/icons/SettingIcon.svelte';
	import LabelValue from '$lib/components/LabelValue.svelte';
	import LabelInputCopy from '$lib/components/labelInputCopy.svelte';
	import LabelPassword from '$lib/components/LabelPassword.svelte';
	import LabelInputChecklist from '$lib/components/labelInputChecklist.svelte';

  pageTitle.set('Informasi Device');

  let deviceData = {
    name: 'POS Alpha 1',
    id: 'dev-192837',
    token: 'abcde-12345-fghij-67890',
    password: 'my-secret-password',
    specification: 'Intel NUC, 8GB RAM, 128GB SSD',
    description: 'POS utama di kasir depan',
    tag: 'POS-KASIR-01',
    interval: '5 Menit',
    lastUpdate: '2025-06-07 14:30',
    location: {
      latitude: '-6.914744',
      longitude: '107.609810',
      address: 'Jl. Merdeka No. 10, Bandung',
      postalCode: '40123'
    },
    installation: {
      installer: 'PT. Teknologi Nusantara',
      installDate: '2025-01-15',
      notes: 'Instalasi selesai tanpa kendala'
    }
  };

  let showPassword = false;
  let copiedToken = false;

  const togglePassword = () => showPassword = !showPassword;

  const copyToken = () => {
    navigator.clipboard.writeText(deviceData.token);
    copiedToken = true;
    setTimeout(() => copiedToken = false, 2000);
  };
</script>

<div class="font-inter space-y-6 rounded-xl bg-white p-6 shadow-sm">
  <div class="flex items-center justify-between border-b border-[#E0E0E0] pb-5">
    <h1 class="text-xl font-semibold text-[#2C2C30]">Detail Device</h1>
    <button class="bg-[#FFA000] hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
      <SettingIcon size={20} color="white" /> Pengaturan
    </button>
  </div>

  <!-- Data Pos -->
  <div class="mb-8">
    <h2 class="text-lg font-medium text-[#212529] mb-4">Data Pos</h2>
    <div class="space-y-4">
      <LabelValue label="Nama Device" value={deviceData.name} id="device-name" />
      <LabelInputChecklist label="Id Device" value={deviceData.id} id="device-id" />
      <LabelInputCopy label="Token" value={deviceData.token} id="device-token" onCopy={copyToken} showCopied={copiedToken} />
      <LabelPassword label="Password" value={deviceData.password} id="device-password" show={showPassword} toggleShow={togglePassword} />
      <LabelValue label="Spesifikasi" value={deviceData.specification} id="device-specification" />
      <LabelValue label="Deskripsi" value={deviceData.description} id="device-description" />
      <LabelValue label="Tag Device" value={deviceData.tag} id="device-tag" />
      <LabelValue label="Interval" value={deviceData.interval} id="device-interval" />
      <LabelValue label="Last Update" value={deviceData.lastUpdate} id="last-update" />
    </div>
  </div>

  <!-- Lokasi -->
  <div class="mb-8">
    <h2 class="text-lg font-medium text-[#212529] mb-4">Lokasi</h2>
    <div class="space-y-4">
      <LabelValue label="Latitude" value={deviceData.location.latitude} id="device-latitude" />
      <LabelValue label="Longitude" value={deviceData.location.longitude} id="device-longitude" />
      <LabelValue label="Alamat" value={deviceData.location.address} id="device-address" />
      <LabelValue label="Kode Pos" value={deviceData.location.postalCode} id="device-postal" />
    </div>
  </div>

  <!-- Instalasi -->
  <div class="mb-4">
    <h2 class="text-lg font-medium text-[#212529] mb-4">Instalasi</h2>
    <div class="space-y-4">
      <LabelValue label="Teknisi" value={deviceData.installation.installer} id="device-installer" />
      <LabelValue label="Tanggal Instalasi" value={deviceData.installation.installDate} id="device-install-date" />
      <LabelValue label="Catatan" value={deviceData.installation.notes} id="device-install-notes" />
    </div>
  </div>
</div>
