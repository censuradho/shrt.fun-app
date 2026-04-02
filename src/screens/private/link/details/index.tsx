import { Icon } from "@/components/icons"
import { useNavigate } from "react-router"
import { LinkInfoSection } from "./components/LinkInfoSection"
import { QRCodeSection } from "./components/QRCodeSection"
import { useUrlDetailViewModel } from "./hooks/useUrlDetailViewModel"

export function DetailLinkScreen () {
  const {
    data,
    isGeneratingQrCode,
    isPending,
    qrCode
  } = useUrlDetailViewModel()
  const navigate = useNavigate()

  return (
    <>
      <div className="container mt-10">
        <header className="flex justify-between items-center gap-4">
          <button className="cursor-pointer flex items-center gap-2" onClick={() => navigate(-1)}>
            <Icon size={20} name="ChevronLeft" />
            <span className="text-md font-medium">Voltar a lista</span>
          </button>
        </header>
        <LinkInfoSection data={data} loading={isPending} />
        <QRCodeSection 
          qrCode={qrCode} 
          isPending={isGeneratingQrCode} 
        />
      </div>
    </>
  )
}
