import WooCommerceAPI from 'react-native-woocommerce-api';

const wooCommerceApi = new WooCommerceAPI({
    url: 'https://ayanafoodorganic.com', // Your store URL
    ssl: true,
    consumerKey: 'ck_eb90acf23bd3b50dde4c1aa0a237206aae38f013', // Your consumer secret
    consumerSecret: 'cs_0b7753fdb74ee0f47d0828592a31d33a6da1d844', // Your consumer secret
    wpAPI: true, // Enable the WP REST API integration
    version: 'wc/v3', // WooCommerce WP REST API version
    queryStringAuth: true
  });

  export default wooCommerceApi;