package cr.ac.ucr.ie.fast506.domain;

public enum ModuleType {

    ROLES("roles", "Roles"),
    PERMISSIONS("permissions", "Permisos"),
    USERS("users", "Usuarios"),
    CATALOG("catalog", "Catálogo"),
    UNITS("units", "Unidades"),
    SUPPLIERS("suppliers", "Proovedores"),
    BRANCHES("branches", "Sucursales"),

    QUOTATIONS("quotation", "Cotizaciones"),
    SALES("sales", "Ventas"),
    TESTDRIVE("testdrive", "Agenda Test Drive"),
    MECHANIC("mechanic", "Agenda Taller"),//Agenda taller
    REPAIRREPORT("repairreport", "Informes de reparación"),
    ADDS("adds", "Anuncios");

    private final String id;
    private final String name;

    ModuleType(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
