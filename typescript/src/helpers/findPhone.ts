export const findPhone = (phones: [{ country: string, number: number, validated_at: string }]) => {
    let max = phones[0];
    for (const phone of phones) {
        if (!max.validated_at || phone.validated_at && phone.validated_at > max.validated_at) {
            max = phone;
        }
    }
    return max;
};
