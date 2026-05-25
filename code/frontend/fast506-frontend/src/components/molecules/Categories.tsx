import { useState, useEffect } from "react";
import { CategoriesCatalog } from "../../models/CategoriesCatalog";
import { Catalog } from "../../models/Catalog";
import { getCatalogByBodyWork } from "../../services/CatalogService";
import CardWithButton from "./CardWithButton";

interface CategoriesProps {
  categories: CategoriesCatalog[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const Categories = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoriesProps) => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      getCatalogByBodyWork(selectedCategory)
        .then(setCatalogs)
        .finally(() => setLoading(false));
    }
  }, [selectedCategory]);

  const handleSelect = async (bodyWork: string) => {
    onSelectCategory(bodyWork);
  };

  return (
    <div style={{ padding: "0 40px", backgroundColor: "#EEF1EF" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "60px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {categories.map((category, index) => {
          const isActive = selectedCategory === category.bodyWork;
          return (
            <div
              key={index}
              onClick={() => handleSelect(category.bodyWork)}
              style={{
                position: "relative",
                paddingBottom: "10px",
                fontWeight: isActive ? "bold" : 400,
                cursor: "pointer",
                color: "#2C3E50",
                transition: "0.3s",
                fontSize: "0.85rem",
              }}
            >
              {category.bodyWork} ({category.total})
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "2px",
                    backgroundColor: "#2C3E50",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {loading ? (
        <div className="text-center my-4">
          <div className="spinner-border" style={{ color: "#A9B4C3" }} />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "flex-start",
            padding: "0 8px",
            minHeight: "clamp(220px, 50vh, 420px)",
            maxHeight: "clamp(220px, 50vh, 420px)",
            overflowY: "auto",
            alignContent: "flex-start",
          }}
        >
          {catalogs.map((catalog) => (
            <CardWithButton
              key={catalog.idCatalog}
              image={`http://localhost:8080/${catalog.image}`}
              model={catalog.carName}
              price={catalog.basePrice}
              onCotizar={() => console.log(`Cotizar: ${catalog.carName}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;