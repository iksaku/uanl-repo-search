<script>
    import '$assets/app.css'
    import logo from '$assets/logo.svg?url'
</script>

<svelte:head>
    <link rel='icon' href={logo} type="image/svg+xml" />

    <title>UANL Repo Search</title>
    <meta name="description" content="Descubre proyectos creados por alumnos y docentes de la Universidad Autónoma de Nuevo León">
    <meta name="og:image" content={logo}>

    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@iksaku2">
</svelte:head>

<slot></slot>
