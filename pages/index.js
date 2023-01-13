import axios from "axios";
import Table from "./components/table";
import { useQuerySubscription } from 'react-datocms'
// export const getStaticProps = async () => {

//   const res = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
//     headers: {
//       'X-CMC_PRO_API_KEY': '576d6352-5a38-4283-8166-34a511346eaf',
//     },
//   });

//   return {
//     props: { lists: res.data.data }
//   }
// }

export const getServerSideProps = async () => {

  const res = await fetch(
    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    {
      method: 'GET',
      headers: {
        'X-CMC_PRO_API_KEY': '576d6352-5a38-4283-8166-34a511346eaf',
      }
    }
  );

  const data = await res.json();

  console.log(data.data)

  return { props: { lists: data.data } }

}

const numberFormat = (value) =>
  new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'USD'
  }).format(value)

const supplyFormat = (value) =>
  new Intl.NumberFormat('ja-JP', {
    maximumFractionDigits: 0,
  }).format(value)

const precentFormat = (value) =>
  new Intl.NumberFormat('ja-JP', {
    maximumFractionDigits: 2,
  }).format(value)

export default function Home({ lists }) {
  console.log(lists)
  console.log()
  return (

    <>
      <div className="bg-[#282A3A]">
        <div className="container mx-auto py-20">
          <h1 className="text-gray-100 text-3xl py-5">
            Cryptocurrencies
          </h1>
          <div className="border border-gray-400 rounded-xl">
            <table className="min-w-full table-auto">
              <thead className=" text-gray-100 h-16 border-b-2 border-gray-400">
                <tr className="py-10">
                  <th className="pr-20">
                    <span>#</span>
                  </th>
                  <th className="pr-36">
                    <span>Name</span>
                  </th>
                  <th>
                    <span>Price</span>
                  </th>
                  <th>
                    <span>Volume&#40;24h&#41;</span>
                  </th>
                  <th>
                    <span>1h %</span>
                  </th>
                  <th>
                    <span>24h %</span>
                  </th>
                  <th>
                    <span>7d %</span>
                  </th>
                  <th>
                    <span>Market Cap</span>
                  </th>
                  <th>
                    <span>Circulating Supply</span>
                  </th>
                </tr>
              </thead>
              <tbody className="border-t border-gray-500">
                {lists.map(list => (
                  <tr className="text-center text-white font-normal" key={list.id}>
                    <td className="py-4 pr-20 border-t border-gray-700">
                      {list.cmc_rank}
                    </td>
                    <td className="py-4 border-t border-gray-700 text-start pl-16 font-semibold">
                      {list.name}
                    </td>
                    <td className="py-4 border-t border-gray-700">
                      {numberFormat(list.quote.USD.price)}
                    </td>
                    <td className="py-4 border-t border-gray-700">
                      {numberFormat(list.quote.USD.volume_24h)}
                    </td>
                    <td className={list.quote.USD.percent_change_1h > 0 ? 'py-4 border-t border-gray-700 text-green-500 font-semibold' : 'py-4 border-t border-gray-700 font-semibold text-red-500'}>
                      {precentFormat(list.quote.USD.percent_change_1h)}%
                    </td>
                    <td className={list.quote.USD.percent_change_24h > 0 ? 'py-4 border-t border-gray-700 text-green-500 font-semibold' : 'py-4 border-t border-gray-700 font-semibold text-red-500'}>
                      {precentFormat(list.quote.USD.percent_change_24h)}%
                    </td>
                    <td className={list.quote.USD.percent_change_7d > 0 ? 'py-4 border-t border-gray-700 text-green-500 font-semibold' : 'py-4 border-t border-gray-700 font-semibold text-red-500'}>
                      {precentFormat(list.quote.USD.percent_change_7d)}%
                    </td>
                    <td className="py-4 border-t border-gray-700">
                      {numberFormat(list.quote.USD.market_cap)}
                    </td>
                    <td className="py-4 border-t border-gray-700">
                      {supplyFormat(list.circulating_supply)} {list.symbol}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

