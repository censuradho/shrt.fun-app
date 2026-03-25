import { LinkButton } from "@/components/LinkButton";
import { paths } from "@/constants/routes";
import { useLinkListViewModel } from "./hooks/useLinkListViewModel";
import { LinkListItem } from "./components/LinkListItem";

export function LinkListScreen () {
  const { 
    sentinelRef, 
    links, 
    urlSelected, 
    toggleUrlSelected, 
    hasNextPage 
  } = useLinkListViewModel()

  const renderUrls = links?.pages?.flatMap(page => (
    page.data?.data.map(link => (
      <li
        key={link.id}
        className="overflow-hidden w-full"
      >
        <LinkListItem
          data={link}
          selected={urlSelected.includes(link.id)}
          onSelect={() => toggleUrlSelected(link.id)}
        />
      </li>
    ))
  ))

  return (
    <div>
      <div className="container mt-10">
        <header className="flex justify-between items-center border-b border-outline pb-4">
          <h1 className="text-2xl font-bold mb-4">Meus links</h1>
          <LinkButton to={paths.private.link.create}>Criar link</LinkButton>
        </header>
        <section className="mt-6 w-full">
          <ul className="flex flex-col gap-1 w-full">
            {renderUrls}
          </ul>
          <div ref={sentinelRef} className="w-full">
            {!hasNextPage && (
              <div className="py-6 flex items-center gap-4 justify-center">
                <hr className="border border-outline w-10 lg:w-30" />
                <span className="text-sm whitespace-nowrap">Você chegou ao fim dos seus links</span>
                <hr className="border border-outline w-10 lg:w-30" />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}