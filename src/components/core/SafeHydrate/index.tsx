/*
* ---------- WARNING: THIS WILL DISABLE SSR AND THE NEXT.JS DYNAMIC ROUTING FEATURE ----------
*
* This is a wrapper to be used in case SSR is desired to be disabled within an application
* Wrap your pages/_app.tx within this component to disable SSR
*
* After that, add the following code to your next.config.js file:
	 module.exports = {
	  target: "serverless",
	  async rewrites() {
	    return [
	      // Rewrite everything to `pages/index`
	      {
	        source: "/:any*",
	        destination: "/",
	      },
	    ];
	  },
	};
*
* ---------- WARNING: THIS WILL DISABLE SSR AND THE NEXT.JS DYNAMIC ROUTING FEATURE ----------
*/

type SafeHydrateProps = {
	children: JSX.Element
}

export default function SafeHydrate(props: SafeHydrateProps) {
	const {children} = props
	return (
		<div suppressHydrationWarning>
			{typeof window === 'undefined' ? null : children}
		</div>
	)
}