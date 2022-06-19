export async function api(request, {queryShop, session}) {
  if (request.method === 'POST') {
    const {isoCode, name} = await request.json();

    await session.set('countryCode', isoCode);
    await session.set('countryName', name);

    return 'success';
  }

  const {
    data: {
      localization: {availableCountries},
    },
  } = await queryShop({
    query: QUERY_SHOPIFY,
  });

  return availableCountries.sort((a, b) => a.name.localeCompare(b.name));
}

const QUERY_SHOPIFY = `
  query Localization {
    localization {
      availableCountries {
        isoCode
        name
        currency {
          isoCode
        }
      }
    }
  }
`;
