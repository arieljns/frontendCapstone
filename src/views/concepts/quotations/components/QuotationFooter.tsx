import './quotationHeader.css'
export default function QuotationFooter() {
    return (
        <footer className="quotation-footer w-full  bg-[#512DA8] text-white text-xs leading-relaxed mt-10 px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                {/* Company + Brand Logos */}
                <div className="space-y-2 font-semibold">
                    <div>PT Mid Solusi Nusantara</div>
                    <div className="space-x-3 text-sm font-normal">
                        <span>&gt; talenta</span>
                        <span>&gt; sleekr</span>
                        <span>&gt; jurnal</span>
                        <span>&#10003; klikpajak</span>
                    </div>
                </div>

                {/* Head Office */}
                <div className="space-y-1">
                    <div className="font-bold">Head Office</div>
                    <div>
                        MidPlaza 2, 4<sup>th</sup> Fl.
                    </div>
                    <div>Jl. Jend. Sudirman Kav. 10–11</div>
                    <div>Jakarta 10220, Indonesia</div>
                    <div className="flex items-center gap-2">
                        📞 <span>(021) 570 4030</span>
                    </div>
                </div>

                {/* Commercial Office */}
                <div className="space-y-1">
                    <div className="font-bold">Commercial Office</div>
                    <div>
                        SOHO Capital 43<sup>rd</sup> Fl.
                    </div>
                    <div>Podomoro City</div>
                    <div>Jl. Letjen. S. Parman Kav. 28</div>
                    <div>Jakarta 11470, Indonesia</div>
                    <div className="flex items-center gap-2">
                        📞 <span>(021) 5050 1500</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
