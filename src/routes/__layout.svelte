<script>
    import '$assets/app.css'

    import svg from '$assets/logo.svg'
    import png from '$assets/logo.svg?width=32&height=32&format=png'
</script>

<svelte:head>
    <link rel="icon" type="image/svg+xml" href={svg} />
    <link rel="alternate icon" type="image/png" sizes="any" href={png} />

    <title>UANL Repo Search</title>
    <meta name="description" content="Descubre proyectos creados por alumnos y docentes de la Universidad Autónoma de Nuevo León">

    <meta name="og:title" content="UANL Repo Search">
    <meta name="og:description" content="Descubre proyectos creados por alumnos y docentes de la Universidad Autónoma de Nuevo León">
    <meta name="og:type" content="website">
    <meta name="og:image" content={svg}>

    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@iksaku2">
    <meta name="twitter:creator" content="@iksaku2">
</svelte:head>

<slot></slot>
