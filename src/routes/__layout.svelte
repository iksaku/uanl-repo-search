<script>
    import '$assets/app.css'
    import logo from '$assets/logo.svg?url'
</script>

<svelte:head>
    <link rel='icon' href={logo} type="image/svg+xml" />

    <title>UANL Repo Search</title>
    <meta name="og:title" content="UANL Repo Search">
    <meta name="og:description" content="Descubre proyectos creados por alumnos y docentes de la Universidad Autónoma de Nuevo León">
    <meta name="og:type" content="website">
    <meta name="og:image" content={logo}>

    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@iksaku2">
    <meta name="twitter:creator" content="@iksaku2">
</svelte:head>

<slot></slot>
