require("prismjs/themes/prism.css")

exports.onRouteUpdate = ({ location }) => {
  if (location.hash) {
    setTimeout(() => {
      const target = document.querySelector(`${location.hash}`)

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        })
      }
    }, 0)
  }
}
