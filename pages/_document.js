import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage
   
    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      })
 
    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  constructor(props){
    super(props);
    this.siteUrl = '';
    if(this.props['__NEXT_DATA__'] !== undefined && this.props['__NEXT_DATA__'].props !== undefined && this.props['__NEXT_DATA__'].props.request !== undefined){
        this.request = this.props['__NEXT_DATA__'].props.request;
        this.siteUrl = this.request !== undefined ? this.request['protocol'] + '//' + this.request['host']  : '';
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
        <link rel="manifest" href={`${this.siteUrl}/manifest.json`} />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossOrigin="anonymous" />
        <link rel="stylesheet" href={`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css`} integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link rel="stylesheet" href={`https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css`} integrity="sha512-H9jrZiiopUdsLpg94A333EfumgUBpO9MdbxStdeITo+KEIMaNfHNvwyjjDJb+ERPaRS6DpyRlKbvPUasNItRyw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        
        <Script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossOrigin="anonymous" referrerPolicy="no-referrer"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossOrigin="anonymous"></Script>
        <Script src={`https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js`} crossOrigin="anonymous" referrerPolicy="no-referrer">
        </Script>
        <Script dangerouslySetInnerHTML={{__html: "\n\t$(document).ready(function(){\n    \t$('.menu').hover(\n        \tfunction(){console.log('In'); $(this).find('.overlay').fadeIn();},\nfunction(){console.log('Out'); $(this).find('.overlay').fadeOut();}\n        )\n\t})\n" }} />
        </Head>
        <body>
          <Main {...this} />
          <NextScript {...this} />
         
        </body>
      </Html>
    )
  }
}
 
export default MyDocument