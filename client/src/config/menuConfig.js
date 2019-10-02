const menuList = [
    {
        title:'Home',
        key:'/home',
        icon:'home',
        isPublic:true,
    },
    {
        title:'Universities Info',
        key:'/univ',
        icon:'book',
        isPublic:true,
    },
    {
        title:'More Info',
        key:'/more',
        icon:'ellipsis',
        ForVisitor:true
    },
    {
        title:'Applicants Info',
        key:'/app',
        icon:'database',
    },
    {
        title: 'User Manage',
        key: '/user',
        icon: 'team'
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
                title:'Map',
                key:'/charts/map',
                icon:'environment'
            }
        ]
    },
];
export default menuList;
