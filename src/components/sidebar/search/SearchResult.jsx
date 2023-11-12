import Contact from "./Contact"

export const  SearchResult =({searchResults}) => {
  return (
    <div className="w-full convos scrollbar">
  {/* Heading */}
  <div className="flex flex-col px-8 pt-8">
    <h1 className="font-extralight text-md text-green_2">Contacts</h1>
  </div>

  {/* Results */}
<ul>
  {
    searchResults && searchResults.map((user) => 
      <Contact contact={user} key={user._id} />
    )
  }
</ul>
    </div>
  )
}
