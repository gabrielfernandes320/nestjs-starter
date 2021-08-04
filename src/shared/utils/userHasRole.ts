export default function userHasRoles(user, requiredRoles){
    if (user !== undefined) {
        const userRoles = user.roles?.map((item: any) => item.reference);

        return requiredRoles.some((role) => userRoles?.includes(role));
    }

    return true;
}
