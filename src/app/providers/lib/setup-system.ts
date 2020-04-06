export const SetupSystem = {
    setDbs: () => {
        console.log("DATA IN SYSTEM");

        if (localStorage.getItem('_dt')) {
            return false
        }
        let data_system = {
            info_system: {
                data_created_at: new Date()
            },
            data: []
        }
        localStorage.setItem('_dt', JSON.stringify(data_system))
    },

    setColections: () => {
        console.log("COLLLECTIONS IN SYSTEM");
        if (localStorage.getItem('col')) {
            return false
        }
        localStorage.setItem('col', JSON.stringify([]))
    },
}