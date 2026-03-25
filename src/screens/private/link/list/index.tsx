import { LinkButton } from "@/components/LinkButton";
import { paths } from "@/constants/routes";
import { useLinkListViewModel } from "./hooks/useLinkListViewModel";
import { LinkListItem } from "./components/LinkListItem";
import { TextField } from "@/components/form/TextField";

export function LinkListScreen () {
  const { 
    sentinelRef, 
    links, 
    urlSelected, 
    toggleUrlSelected, 
    hasNextPage,
    search,
    setSearch
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
        <header className="border-b border-outline pb-4 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-4">Meus links</h1>
            <LinkButton to={paths.private.link.create}>Criar link</LinkButton>
          </div>
          <div className="w-full max-w-100">
            <TextField
              id="search"
              name="search"
              placeholder="Buscar links"
              label="Buscar links"
              renderLabel={false}
              headIcon={{
                name: 'Search'
              }}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
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