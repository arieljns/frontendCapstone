import QuotationFooter from './QuotationFooter'

export default function QuotationTerms() {
    return (
        <div
            id="quotation-print"
            className="w-[210mm] min-h-[297mm] mx-auto pt-[10mm] pl-[10mm] pr-[10mm] text-black text-sm font-sans bg-white"
        >
            <hr className="border-black"></hr>
            <h3 className="text-lg font-semibold mb-2">Syarat dan Ketentuan</h3>
            <ol className="list-decimal list-inside space-y-1 mb-6">
                <li>Masa aktif dimulai berdasarkan dokumen BASTP.</li>
                <li>
                    Jika pelatihan belum dilakukan hingga 90 hari setelah
                    pembayaran pertama, maka masa aktif dimulai dari hari ke-90.
                </li>
                <li>
                    Penambahan karyawan di atas 100 orang dikenakan Rp
                    25.000/karyawan/bulan (minimal 10 karyawan).
                </li>
                <li>
                    Pembayaran harus dilakukan maksimal 9 hari kalender setelah
                    invoice diterbitkan.
                </li>
                <li>
                    Pembatalan sepihak akan dikenakan denda atau tidak ada
                    pengembalian dana tergantung metode pembayaran.
                </li>
                <li>
                    Pertemuan dilakukan secara daring setelah pembayaran
                    pertama.
                </li>
                <li>
                    Formulir Berlangganan wajib ditandatangani untuk aktivasi
                    pelatihan.
                </li>
            </ol>

            <h3 className="text-lg font-semibold mb-2">Term of Payment</h3>
            <ul className="list-disc list-inside mb-6 space-y-1">
                <li>
                    DP: Rp 2.500.000 (Booking Fee) – Jatuh tempo: 23 Desember
                    2024
                </li>
                <li>
                    Pelunasan DP: Rp 5.825.000 – Jatuh tempo: 23 Januari 2025
                </li>
                <li>
                    Pembayaran II: Rp 8.325.000 – Jatuh tempo: 23 April 2025
                </li>
                <li>
                    Pembayaran III: Rp 8.325.000 – Jatuh tempo: 23 Juli 2025
                </li>
                <li>
                    Pembayaran IV: Rp 8.325.000 – Jatuh tempo: 23 Oktober 2025
                </li>
            </ul>

            <h3 className="text-lg font-semibold mb-2">Informasi Rekening</h3>
            <p className="mb-1">
                <strong>Bank:</strong> BCA
            </p>
            <p className="mb-1">
                <strong>No. Rekening:</strong> 47-888-888-11
            </p>
            <p className="mb-1">
                <strong>Atas Nama:</strong> PT. Mid Solusi Nusantara
            </p>
            <p className="mb-6">
                <strong>NPWP:</strong> 76.156.064.8-022.000
            </p>

            <div className="text-sm italic text-gray-600">
                *Promo Gratis Bulan tidak dicantumkan dalam
                quotation/invoice/kontrak karena bisa menjadi objek pajak. Info
                promo akan dikirim lewat email.
            </div>
            <QuotationFooter />
        </div>
    )
}
