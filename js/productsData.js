const dataProductos = [
    {
        id: '1001',
        nombre: "Pizza Personal",
        precio: "20",
        descripcion: "Lorem ipsum dolor sit amet",
        categoria: 'pizza',
        imagen: "001.jpg",
        stock: 5        
    },
    {
        id: '1002',
        nombre: "Pizza Grande",
        precio: "30",
        descripcion: "Lorem ipsum dolor sit amet",
        categoria: 'pizza',
        imagen: "002.jpg",
        stock: 5        
    },
    {
        id: '1003',
        nombre: "Pizza Familiar",
        precio: "40",
        descripcion: "Lorem ipsum dolor sit amet",
        categoria: 'pizza',
        imagen: "003.jpg",
        stock: 5        
    },
    {
        id: '1004',
        nombre: "Hamburguesa con tocineta",
        precio: "15",
        descripcion: "Lorem ipsum dolor sit amet",
        categoria: 'hamburguesa',
        imagen: "004.jpg",
        stock: 5        
    },
    {
        id: '1005',
        nombre: "Hamburguesa VIP",
        precio: "20",
        descripcion: "Lorem ipsum dolor sit amet",
        categoria: 'hamburguesa',
        imagen: "005.jpg",
        stock: 5        
    },
    {
        id: '1006',
        nombre: "Hamburguesa con papas",
        precio: "25",
        descripcion: "Lorem ipsum dolor sit amet",
        categoria: 'hamburguesa',
        imagen: "006.jpg",
        stock: 5        
    },
    {
        id: '1007',
        nombre: "Pollo Broaster",
        precio: "20",
        descripcion: "Lorem ipsum dolor sit amet",
        categoria: 'pollo',
        imagen: "007.jpg",
        stock: 5        
    },
    {
        id: '1008',
        nombre: "Pollo a la brasa",
        precio: "40",
        descripcion: "Lorem ipsum dolor sit amet",
        categoria: 'pollo',
        imagen: "008.jpg",
        stock: 5        
    },
    {
        id: '1009',
        nombre: "Pollo a la leña",
        precio: "55",
        descripcion: "Lorem ipsum dolor sit amet",
        categoria: 'pollo',
        imagen: "009.jpg",
        stock: 5        
    }
]
const dataCupones = [
    {
        id: '01',
        nombre: 'Repechaje',
        codigo: 'REPE15',
        descuento: 15
    },
    {
        id: '02',
        nombre: 'Fiestas Patrias',
        codigo: 'PERU2022',
        descuento: 30
        
    }
]
const usuarios = [
    {
        id: '01',
        rol: 'customer',
        username: 'carlos',
        email: 'carlos@alpha.com',
        password: '123456'
    },
    {
        id: '02',
        rol: 'customer',
        username: 'angela',
        email: 'angela@alpha.com',
        password: '654321'
    }
]

const departamentos = [
    {
        id: '01',
        nombre: 'Lima Metropolitana'
    },
    {
        id: '02',
        nombre: 'Arequipa'
    }
]
const provincias = [
    {
        id: 'P01',
        nombre: 'Lima',
        departamento: '01'
    },
    {
        id: 'P02',
        nombre: 'Arequipa',
        departamento: '02'
    },
    {
        id: 'P03',
        nombre: 'Camaná',
        departamento: '02'
    }
]

const distritos = [
    {
        id: 'd01',
        nombre: 'Chorrillos',
        provincia: 'P01',
        precio: 15
    },
    {
        id: 'd02',
        nombre: 'San Borja',
        provincia: 'P01',
        precio: 20
    },
    {
        id: 'd03',
        nombre: 'Arequipa',
        provincia: 'P02',
        precio: 25
    },
    {
        id: 'd04',
        nombre: 'Cerro Colorado',
        provincia: 'P02',
        precio: 28
    },
    {
        id: 'd05',
        nombre: 'Camaná',
        provincia: 'P03',
        precio: 32
    },
    {
        id: 'd06',
        nombre: 'Quilca',
        provincia: 'P03',
        precio: 40
    }
]
