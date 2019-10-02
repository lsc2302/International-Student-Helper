const AuthMenuConfig = [
    {
        title:'Home',
        key:'/home',
        icon:'home',
        isPublic:true,
    },
    {
        title:'Universities Info Show',
        key:'/univ',
        icon:'book',
    },
    {
        title:'Universities Info Modify',
        key:'/univ/modify',
        icon:'book',
    },
    {
        title:'Applicants Info',
        key:'/app',
        icon:'team',
    },
    {
        title:'Applicants Modify',
        key:'/app/modify',
        icon:'team',
    },
    {
        title: 'User Manage',
        key: '/user',
        icon: 'user'
    },
    {
        title: 'Role Manage',
        key: '/role',
        icon: 'safety',
    },
    {
        title: 'Charts',
        key: '/charts',
        icon: 'area-chart',
        children: [
            {
                title: 'Bar',
                key: '/charts/bar',
                icon: 'bar-chart'
            },
            {
                title: 'Line',
                key: '/charts/line',
                icon: 'line-chart'
            },
            {
                title: 'Pie',
                key: '/charts/pie',
                icon: 'pie-chart'
            },
            {
                title: 'Map',
                key: '/charts/map',
                icon: 'map-chart'
            },
        ]
    },
];
export default AuthMenuConfig;