import axios from "axios";
export const getStaticProps = async () => {

  const res = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
    headers: {
      'X-CMC_PRO_API_KEY': '576d6352-5a38-4283-8166-34a511346eaf',
    },
  });
  
  return {
    props: { lists: res.data.data }
  }
}

export default function Home({ lists }) {
console.log(lists)
  return (
    <>
      <div>
        <h1>List</h1>
        {lists.map(list => (
          <div key={list.id}>
            <h3>{list.name}</h3>
          </div>
        ))}
      </div>
    </>
  )
}

