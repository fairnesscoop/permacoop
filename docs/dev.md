# dev

## Icons

Icons come from https://heroicons.com/

To add a new icon, create a corresponding `.svelte` file with the HeroIcons SVG.

## SvelteKit migration

During the migration from Sapper to SvelteKit (see [#214](https://github.com/fairnesscoop/permacoop/issues/214)), the `client` is run during development with the following setup:

```
localhost --- proxy         (:3001) 
                ├--- legacy (:3002)
                └--- kit    (:3003)
```
