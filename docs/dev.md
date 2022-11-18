# dev

## Icons

Les icônes sont tirées de https://heroicons.com/

Pour ajouter une nouvelle icône, créer un fichier `.svelte` en utilisant le SVG tiré de HeroIcons.

## SvelteKit migration

During the migration from Sapper to SvelteKit (see [#214](https://github.com/fairnesscoop/permacoop/issues/214)), the `client` is run during development with the following setup:

```
localhost --- proxy[nginx]   (:3001) 
                 ├--- legacy (:3002)
                 └--- kit    (:3003)
```
