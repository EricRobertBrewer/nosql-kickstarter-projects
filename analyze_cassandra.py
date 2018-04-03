# Run with:
# spark-submit --packages anguenot/pyspark-cassandra:0.7.0 --conf spark.cassandra.connection.host=127.0.0.1 analyze_cassandra.py
# Requires `pip install cassandra-driver pyspark==2.2.1`

from pyspark.sql import SparkSession, SQLContext
import pyspark_cassandra

spark = SparkSession \
    .builder \
    .appName("Kickstarter") \
    .config("spark.cassandra.connection.host", "127.0.0.1") \
    .getOrCreate()
spark.sparkContext.setLogLevel("WARN")

df = spark.read.format("org.apache.spark.sql.cassandra")\
    .options(keyspace="kickstarter", table="projects")\
    .load()

df.printSchema()
df.show()
