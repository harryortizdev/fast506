package cr.ac.ucr.ie.fast506.dao;

import java.util.LinkedList;

public interface CRUD<T> {

    public LinkedList<T> getAll();

    public void add(T t);

    public void update(T t);

    public void delete(Integer i);

    public T find(Integer i);

}
