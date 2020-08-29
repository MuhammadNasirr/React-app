export const sortByDate = (data) => {
    return data.sort(function (a, b) {
        return new Date(b.created_at) - new Date(a.created_at);
    });
} 